import { IconButton, Input } from "@chakra-ui/react";
import styles from "@/styles/components/categoryForm.module.css";
import { FormEvent, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { Category } from "@prisma/client";
import { User } from "@supabase/supabase-js";
import { ProductMap } from "@/pages/createMenu";

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
}

export function CategoryForm(props: CategoryFormProps) {
  const [newCategory, setNewCategory] = useState("");

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
    props.setCreate(false);
    const response = await fetch("/api/create-category", options);
    const result = await response.json();
    if (response.status === 200) {
      props.setCategories([
        ...props.categories,
        { id: result.id, title: data.title, userId: data.userId },
      ]);
      props.setProductMap({
        ...props.productMap,
        [result.id]: [],
      });
    }
  }

  function handleCancel() {
    setNewCategory("");
    props.handleCancel();
  }

  return (
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
  );
}
