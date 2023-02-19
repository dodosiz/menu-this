import {
  Button,
  ButtonGroup,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tab,
} from "@chakra-ui/react";
import styles from "@/styles/components/categoryTab.module.css";
import { RiDeleteBin6Line } from "react-icons/ri";
import { useState } from "react";
import { Category } from "@prisma/client";

interface CategoryTabProps {
  category: Category;
  categories: Category[];
  setCategories: (c: Category[]) => void;
}

export function CategoryTab(props: CategoryTabProps) {
  const [toDelete, setToDelete] = useState<string | null>(null);

  async function handleDelete(categoryId: string) {
    const JSONdata = JSON.stringify({ id: categoryId });
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setToDelete(null);
    props.setCategories(props.categories.filter((c) => c.id !== categoryId));
    await fetch("/api/delete-category", options);
  }

  return (
    <Tab key={props.category.id} className={styles.category}>
      <span className={styles.category_label}>{props.category.title} </span>
      <IconButton
        variant="ghost"
        aria-label="Delete category"
        className={styles.delete_icon}
        icon={<RiDeleteBin6Line />}
        onClick={() => setToDelete(props.category.id)}
      />
      <Popover
        returnFocusOnClose={false}
        isOpen={props.category.id === toDelete}
        onClose={() => setToDelete(null)}
        placement="right"
        closeOnBlur={false}
      >
        <PopoverTrigger>
          <span></span>
        </PopoverTrigger>
        <PopoverContent>
          <PopoverHeader fontWeight="semibold">Confirmation</PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />
          <PopoverBody>
            Are you sure you want to delete the category &ldquo;
            {props.category.title}&ldquo;
          </PopoverBody>
          <PopoverFooter display="flex" justifyContent="flex-end">
            <ButtonGroup size="sm">
              <Button onClick={() => setToDelete(null)} variant="outline">
                Cancel
              </Button>
              <Button
                onClick={() => handleDelete(props.category.id)}
                colorScheme="red"
              >
                Delete
              </Button>
            </ButtonGroup>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Tab>
  );
}
