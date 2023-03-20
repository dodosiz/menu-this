import { IconButton, Input, Spinner } from "@chakra-ui/react";
import styles from "@/styles/components/create-menu/category/categoryForm.module.css";
import { FormEvent, useState, useEffect } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { createCategory, updateCategory } from "./categoryFormHandler";
import { User } from "firebase/auth";
import { Category } from "@/lib/data/categories";

export interface CategoryFormProps {
  categories: Category[];
  setCategories: (_c: Category[]) => void;
  categoryInEdit?: Category;
  user: User;
  setCreateNewCategory: (_b: boolean) => void;
  handleCancel: () => void;
  setErrorMessage: (_s: string) => void;
  setEditedCategoryId: (_id: string) => void;
  setTabIndex: (_i: number) => void;
}

export function CategoryForm(props: CategoryFormProps) {
  const [categoryTitle, setCategoryTitle] = useState("");
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setCategoryTitle(props.categoryInEdit ? props.categoryInEdit.title : "");
  }, [props.categoryInEdit]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (props.categoryInEdit) {
      updateCategory({
        ...props,
        categoryInEdit: props.categoryInEdit,
        loading: isLoading,
        setLoading: setLoading,
        categoryTitle,
        setCategoryTitle,
      });
    } else {
      createCategory({
        ...props,
        loading: isLoading,
        setLoading: setLoading,
        categoryTitle,
        setCategoryTitle,
      });
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
            maxLength={50}
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
