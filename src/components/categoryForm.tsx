import { IconButton, Input, Spinner } from "@chakra-ui/react";
import styles from "@/styles/components/categoryForm.module.css";
import { FormEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Category } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { ProductMap } from "@/pages/api/get-menu-data/[userId]";

export interface CategoryData {
  userId: string;
  title: string;
}

interface CategoryFormProps {
  categories: Category[];
  user: User;
  productMap: ProductMap;
  setProductMap: (pm: ProductMap) => void;
  setCategories: (c: Category[]) => void;
  setCreate: (b: boolean) => void;
  handleCancel: () => void;
  setErrorMessage: (s: string) => void;
}

export function CategoryForm(props: CategoryFormProps) {
  const [newCategory, setNewCategory] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent, userId: string) {
    event.preventDefault();
    const data: CategoryData = {
      title: (event.target as any).category.value,
      userId,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setNewCategory("");
    setLoading(true);
    const response = await fetch("/api/create-category", options);
    if (response.status === 200) {
      const result = await response.json();
      setLoading(false);
      props.setCreate(false); // close the form
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
      props.setCreate(false);
      props.setErrorMessage("Internal server error");
    }
  }

  function handleCancel() {
    setNewCategory("");
    props.handleCancel();
  }

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {!isLoading && (
        <form
          className={styles.category_form}
          onSubmit={(e) => {
            handleSubmit(e, props.user.id);
          }}
        >
          <Input
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
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
            isDisabled={!newCategory.length}
            size="xs"
          />
          <IconButton
            aria-label="cancel edit"
            icon={<RxCross2 />}
            variant="ghost"
            colorScheme="gray"
            onClick={handleCancel}
            size="xs"
          />
        </form>
      )}
    </>
  );
}
