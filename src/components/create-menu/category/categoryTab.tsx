import { Box, Spinner, Tab } from "@chakra-ui/react";
import styles from "@/styles/components/create-menu/category/categoryTab.module.css";
import { useState } from "react";
import { Category } from "@prisma/client";
import { ContextMenu } from "../contextMenu";
import { handleDelete, swapDates } from "./categoryFormHandler";

interface CategoryTabProps {
  category: Category;
  index: number;
  categories: Category[];
  editedCategoryId: string;
  setCategories: (c: Category[]) => void;
  setErrorMessage: (s: string) => void;
  setEditedCategoryId: (id: string) => void;
  setTabIndex: (i: number) => void;
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
            onMoveLeft={
              props.categories[props.index - 1]
                ? () =>
                    swapDates({
                      id1: props.category.id,
                      id2: props.categories[props.index - 1].id,
                      categories: props.categories,
                      setCategories: props.setCategories,
                      setErrorMessage: props.setErrorMessage,
                      updateTabIndex: () => props.setTabIndex(props.index - 1),
                    })
                : undefined
            }
            onMoveRight={
              props.categories[props.index + 1]
                ? () =>
                    swapDates({
                      id1: props.category.id,
                      id2: props.categories[props.index + 1].id,
                      categories: props.categories,
                      setCategories: props.setCategories,
                      setErrorMessage: props.setErrorMessage,
                      updateTabIndex: () => props.setTabIndex(props.index + 1),
                    })
                : undefined
            }
            onOpenConfirm={() => setCategoryIdToDelete(props.category.id)}
            onEditClick={() => props.setEditedCategoryId(props.category.id)}
          />
        </Box>
      )}
    </>
  );
}
