import { Box, Spinner, Tab } from "@chakra-ui/react";
import styles from "@/styles/components/categoryTab.module.css";
import { useState } from "react";
import { Category } from "@prisma/client";
import { ContextMenu } from "./contextMenu";

interface CategoryTabProps {
  category: Category;
  categories: Category[];
  editedCategoryId: string;
  setCategories: (c: Category[]) => void;
  setErrorMessage: (s: string) => void;
  setEditedCategoryId: (id: string) => void;
}

export function CategoryTab(props: CategoryTabProps) {
  const [categoryIdToDelete, setCategoryIdToDelete] = useState<string | null>(
    null
  );
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
    setCategoryIdToDelete(null);
    const response = await fetch("/api/delete-category", options);
    if (response.status === 200) {
      setLoading(false);
      props.setCategories(props.categories.filter((c) => c.id !== categoryId));
    } else if (response.status === 500) {
      setLoading(false);
      props.setErrorMessage("Internal server error");
    }
  }

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {!isLoading && (
        <Box className={styles.category}>
          <Tab key={props.category.id}>{props.category.title}</Tab>
          <ContextMenu
            confirmMessage={`Are you sure you want to delete the category "${props.category.title}"?`}
            isConfirmOpen={props.category.id === categoryIdToDelete}
            // disable the edit if we are currently editing another category
            editDisabled={!!props.editedCategoryId.length}
            confirmTitle="Delete Category"
            onCloseConfirm={() => setCategoryIdToDelete(null)}
            onDeleteConfirmed={() => handleDelete(props.category.id)}
            onOpenConfirm={() => setCategoryIdToDelete(props.category.id)}
            onEditClick={() => props.setEditedCategoryId(props.category.id)}
          />
        </Box>
      )}
    </>
  );
}
