import {
  Box,
  Button,
  ButtonGroup,
  FormControl,
  IconButton,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useState, useEffect, FormEvent } from "react";
import { IoMdAdd } from "react-icons/io";
import { CategoryFormProps } from "./categoryForm";
import {
  createCategory,
  handleDelete,
  updateCategory,
} from "./categoryFormHandler";
import { RiDeleteBin6Line, RiEditLine } from "react-icons/ri";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { CATEGORY_LIMIT } from "@/constants";
import { Category } from "@/lib/data/categories";

interface CategoryMobileFormProps extends CategoryFormProps {
  currentCategory: Category | null;
  tabIndex: number;
  onMoveUp?: () => void;
  onMoveDown?: () => void;
  setTabIndex: (n: number) => void;
}

export function CategoryMobileForm(props: CategoryMobileFormProps) {
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
        <>
          <Popover
            returnFocusOnClose={false}
            isOpen={isConfirmOpen}
            onClose={() => setConfirmOpen(false)}
            placement="bottom"
            closeOnBlur={false}
          >
            <PopoverTrigger>
              <span></span>
            </PopoverTrigger>
            <PopoverContent>
              <PopoverHeader fontWeight="semibold">
                Delete Category
              </PopoverHeader>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>{`Are you sure you want to delete the category "${props.currentCategory?.title}"?`}</PopoverBody>
              <PopoverFooter display="flex" justifyContent="flex-end">
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => setConfirmOpen(false)}
                    variant="outline"
                  >
                    Cancel
                  </Button>
                  <Button
                    isLoading={isLoading}
                    onClick={async () => {
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
                    colorScheme="red"
                  >
                    Delete
                  </Button>
                </ButtonGroup>
              </PopoverFooter>
            </PopoverContent>
          </Popover>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<BiDotsVerticalRounded />}
              variant="outline"
              color="teal"
            />
            <MenuList zIndex={3}>
              {props.onMoveUp && (
                <MenuItem onClick={props.onMoveUp} icon={<AiOutlineArrowUp />}>
                  Move Up
                </MenuItem>
              )}
              {props.onMoveDown && (
                <MenuItem
                  onClick={props.onMoveDown}
                  icon={<AiOutlineArrowDown />}
                >
                  Move Down
                </MenuItem>
              )}
              <MenuItem
                onClick={() => setCategoryModalOpen(true)}
                icon={<IoMdAdd />}
                disabled={props.categories.length >= CATEGORY_LIMIT}
              >
                Create
              </MenuItem>
              <MenuItem
                onClick={() => {
                  props.setEditedCategoryId(props.currentCategory!.id);
                  setCategoryModalOpen(true);
                }}
                icon={<RiEditLine />}
              >
                Rename
              </MenuItem>
              <MenuItem
                onClick={() => setConfirmOpen(true)}
                icon={<RiDeleteBin6Line />}
              >
                Delete
              </MenuItem>
            </MenuList>
          </Menu>
        </>
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
