import { Box, Spinner, Tab } from "@chakra-ui/react";
import styles from "@/styles/components/categoryTab.module.css";
import { useState } from "react";
import { Category } from "@prisma/client";
import { ContextMenu } from "./contextMenu";
import { handleDelete } from "./categoryFormUtils";

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

  return (
    <>
      {isLoading && <Spinner color="teal.500" />}
      {!isLoading && (
        <Box className={styles.category}>
          <Tab key={props.category.id}>{props.category.title}</Tab>
          <ContextMenu
            confirmMessage={`Are you sure you want to delete the category "${props.category.title}"?`}
            isConfirmOpen={props.category.id === categoryIdToDelete}
            confirmTitle="Delete Category"
            onCloseConfirm={() => setCategoryIdToDelete(null)}
            onDeleteConfirmed={() =>
              handleDelete({
                ...props,
                categoryId: props.category.id,
                setCategoryIdToDelete,
                setLoading,
              })
            }
            onOpenConfirm={() => setCategoryIdToDelete(props.category.id)}
            onEditClick={() => props.setEditedCategoryId(props.category.id)}
          />
        </Box>
      )}
    </>
  );
}
