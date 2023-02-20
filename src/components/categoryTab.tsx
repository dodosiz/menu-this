import { Spinner, Tab } from "@chakra-ui/react";
import styles from "@/styles/components/categoryTab.module.css";
import { useState } from "react";
import { Category } from "@prisma/client";
import { DeleteIconWithConfirm } from "./deleteIconWithConfirm";

interface CategoryTabProps {
  category: Category;
  categories: Category[];
  setCategories: (c: Category[]) => void;
}

export function CategoryTab(props: CategoryTabProps) {
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function handleDelete(categoryId: string) {
    const JSONdata = JSON.stringify({ id: categoryId });
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setLoading(true);
    setToDelete(null);
    const response = await fetch("/api/delete-category", options);
    if (response.status === 200) {
      setLoading(false);
      props.setCategories(props.categories.filter((c) => c.id !== categoryId));
    }
  }

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {!isLoading && (
        <Tab key={props.category.id} className={styles.category}>
          <span className={styles.category_label}>{props.category.title} </span>
          <DeleteIconWithConfirm
            className={styles.delete_icon}
            confirmMessage={`Are you sure you want to delete the category "${props.category.title}"?`}
            isConfirmOpen={props.category.id === toDelete}
            onOpenConfirm={() => setToDelete(props.category.id)}
            onCloseConfirm={() => setToDelete(null)}
            onDeleteConfirmed={() => handleDelete(props.category.id)}
            title="Delete Category"
          />
        </Tab>
      )}
    </>
  );
}
