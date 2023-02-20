import { IconButton, Input, Spinner } from "@chakra-ui/react";
import styles from "@/styles/components/categoryForm.module.css";
import { FormEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Category } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { ProductMap } from "@/pages/api/get-menu-data/[userId]";
import { CreateCategoryData, UpdateCategoryData } from "@/lib/categories";

export interface CategoryFormProps {
  categories: Category[];
  categoryInEdit?: Category;
  user: User;
  productMap: ProductMap;
  setProductMap: (pm: ProductMap) => void;
  setCategories: (c: Category[]) => void;
  setCreateNewCategory: (b: boolean) => void;
  handleCancel: () => void;
  setErrorMessage: (s: string) => void;
  setEditedCategoryId: (id: string) => void;
}

export function CategoryForm(props: CategoryFormProps) {
  const [categoryTitle, setCategoryTitle] = useState(
    props.categoryInEdit ? props.categoryInEdit.title : ""
  );
  const [isLoading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (props.categoryInEdit) {
      updateCategory(props.categoryInEdit);
    } else {
      createCategory();
    }
  }

  async function updateCategory(categoryInEdit: Category) {
    const data: UpdateCategoryData = {
      categoryId: categoryInEdit.id,
      title: categoryTitle,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setCategoryTitle("");
    setLoading(true);
    const response = await fetch("/api/update-category", options);
    if (response.status === 200) {
      setLoading(false);
      props.setEditedCategoryId(""); // close the form
      const updatedCategories = props.categories.map((c) => {
        if (c.id === data.categoryId) {
          return {
            ...c,
            title: data.title,
          };
        }
        return c;
      });
      props.setCategories(updatedCategories);
    } else if (response.status === 500) {
      setLoading(false);
      props.setEditedCategoryId("");
      props.setErrorMessage("Internal server error");
    }
  }

  async function createCategory() {
    const data: CreateCategoryData = {
      title: categoryTitle,
      userId: props.user.id,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setCategoryTitle("");
    setLoading(true);
    const response = await fetch("/api/create-category", options);
    if (response.status === 200) {
      const result = await response.json();
      setLoading(false);
      props.setCreateNewCategory(false); // close the form
      props.setCategories([
        ...props.categories,
        { id: result.id, title: data.title, userId: data.userId },
      ]);
      props.setProductMap({
        ...props.productMap,
        [result.id]: [],
      });
    } else if (response.status === 500) {
      setLoading(false);
      props.setCreateNewCategory(false);
      props.setErrorMessage("Internal server error");
    }
  }

  function handleCancel() {
    setCategoryTitle("");
    props.handleCancel();
  }

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {!isLoading && (
        <form className={styles.category_form} onSubmit={handleSubmit}>
          <Input
            value={categoryTitle}
            onChange={(e) => setCategoryTitle(e.target.value)}
            variant="flushed"
            focusBorderColor="teal.200"
            marginRight="2"
            name="category"
            className={styles.category_input}
          />
          <IconButton
            type="submit"
            aria-label="submit new category"
            icon={<FiCheck />}
            variant="ghost"
            colorScheme="teal"
            marginRight="2"
            isDisabled={!categoryTitle.length}
            size="md"
          />
          <IconButton
            aria-label="cancel edit"
            icon={<RxCross2 />}
            variant="ghost"
            colorScheme="gray"
            onClick={handleCancel}
            size="md"
          />
        </form>
      )}
    </>
  );
}
