import {
  Button,
  FormControl,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState, useEffect, FormEvent } from "react";
import { IoMdAdd } from "react-icons/io";
import { CategoryInlineFormProps } from "./categoryInlineForm";
import {
  createCategory,
  handleDelete,
  updateCategory,
} from "./categoryFormHandler";
import { Category } from "@/lib/data/categories";
import { ContextMenu } from "../contextMenu";

interface CategoryMobileViewProps extends CategoryInlineFormProps {
  currentCategory: Category | null;
  tabIndex: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  setTabIndex: (_n: number) => void;
}

export function CategoryMobileView(props: CategoryMobileViewProps) {
  const [isCategoryModalOpen, setCategoryModalOpen] = useState(false);

  const [categoryTitle, setCategoryTitle] = useState("");

  const [isConfirmOpen, setConfirmOpen] = useState(false);

  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    setCategoryTitle(props.categoryInEdit ? props.categoryInEdit.title : "");
  }, [props.categoryInEdit]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (props.categoryInEdit) {
      await updateCategory({
        ...props,
        categoryInEdit: props.categoryInEdit,
        loading: isLoading,
        setLoading: setLoading,
        categoryTitle,
        setCategoryTitle,
      });
    } else {
      await createCategory({
        ...props,
        loading: isLoading,
        setLoading: setLoading,
        categoryTitle,
        setCategoryTitle,
      });
    }
    handleCancel();
  }

  function handleCancel() {
    setCategoryModalOpen(false);
    props.setEditedCategoryId("");
  }

  return (
    <div>
      {!!props.categories.length && (
        <ContextMenu
          confirmMessage={`Are you sure you want to delete the category "${props.currentCategory?.title}"?`}
          confirmTitle="Delete Category"
          isConfirmOpen={isConfirmOpen}
          onCloseConfirm={() => setConfirmOpen(false)}
          onDeleteConfirmed={async () => {
            await handleDelete({
              categories: props.categories,
              setCategories: props.setCategories,
              categoryId: props.currentCategory!.id,
              userId: props.user.uid,
              setCategoryIdToDelete: () => {},
              setErrorMessage: props.setErrorMessage,
              setLoading: setLoading,
            });
            setConfirmOpen(false);
            if (props.tabIndex > 0) {
              props.setTabIndex(props.tabIndex - 1);
            }
          }}
          onEditClick={() => {
            props.setEditedCategoryId(props.currentCategory!.id);
            setCategoryModalOpen(true);
          }}
          onOpenConfirm={() => setConfirmOpen(true)}
          onMoveDown={props.onMoveDown}
          onMoveUp={props.onMoveUp}
          onCreate={() => {
            setCategoryModalOpen(true);
          }}
        />
      )}
      {!props.categories.length && (
        <Button
          leftIcon={<IoMdAdd />}
          colorScheme="teal"
          variant="outline"
          onClick={() => setCategoryModalOpen(true)}
        >
          Add your first category
        </Button>
      )}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setCategoryModalOpen(false)}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>
            {props.categoryInEdit
              ? `Rename category "${props.categoryInEdit.title}"`
              : "Create new Category"}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <Input
                value={categoryTitle}
                onChange={(e) => setCategoryTitle(e.target.value)}
                variant="outline"
                focusBorderColor="teal.200"
                maxLength={50}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              colorScheme="teal"
              variant="outline"
              mr={3}
              isDisabled={!categoryTitle.length}
              onClick={handleSubmit}
              isLoading={isLoading}
            >
              Save
            </Button>
            <Button colorScheme="gray" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
}
