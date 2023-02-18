import { Layout } from "@/components/layout";
import {
  Button,
  ButtonGroup,
  Heading,
  IconButton,
  Input,
  Link,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Tab,
  TabList,
  Tabs,
} from "@chakra-ui/react";
import { useState, FormEvent, useRef } from "react";
import styles from "@/styles/createMenu.module.css";
import NextLink from "next/link";
import { IoMdAdd } from "react-icons/io";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { RxCross2 } from "react-icons/rx";
import { NextApiRequest } from "next";
import { supabase } from "@/lib/supabase";
import { getCategories } from "@/lib/categories";
import { User } from "@supabase/supabase-js";
import { Category } from "@prisma/client";
import { getTokenFromCookie } from "@/lib/cookies";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = await getTokenFromCookie(req);

  if (!token) {
    return {
      props: {
        authorized: false,
      },
    };
  }

  const { data } = await supabase.auth.getUser(token.access_token);
  if (!data.user) {
    return {
      props: {
        authorized: false,
      },
    };
  }
  const initialCategories = await getCategories(data.user.id);

  return {
    props: {
      authorized: true,
      user: data.user,
      initialCategories,
    },
  };
}

export interface CategoryData {
  userId: string;
  title: string;
}

interface CreateMenuProps {
  authorized: boolean;
  user: User;
  initialCategories: Category[];
}

export default function CreateMenu({
  authorized,
  user,
  initialCategories,
}: CreateMenuProps) {
  const [isCreateMode, setCreate] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [toDelete, setToDelete] = useState<string | null>(null);

  function handleCancel() {
    setCreate(false);
    setNewCategory("");
  }

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
    const response = await fetch("/api/create-category", options);
    const result = await response.json();
    if (response.status === 200) {
      setCategories([
        ...categories,
        { id: result.id, title: data.title, userId: data.userId },
      ]);
      setNewCategory("");
      setCreate(false);
    }
  }

  async function handleDelete(categoryId: string) {
    const JSONdata = JSON.stringify({ id: categoryId });
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch("/api/delete-category", options);
    if (response.status === 200) {
      setCategories(categories.filter((c) => c.id !== categoryId));
    }
  }

  return (
    <Layout user={user}>
      <div className={styles.create_menu}>
        {!authorized && (
          <Heading size="xl" as="h1">
            You need to{" "}
            <Link href="/login" as={NextLink}>
              log in
            </Link>{" "}
            first
          </Heading>
        )}
        {authorized && (
          <>
            <Heading size="xl" as="h1">
              Create Menu
            </Heading>
            <Tabs variant="soft-rounded" colorScheme="teal">
              <TabList className={styles.tablist}>
                {categories.map((category) => {
                  return (
                    <Tab key={category.id} className={styles.category}>
                      <span className={styles.category_label}>
                        {category.title}{" "}
                      </span>
                      <IconButton
                        variant="ghost"
                        aria-label="Delete category"
                        className={styles.delete_icon}
                        icon={<RiDeleteBin6Line />}
                        onClick={() => setToDelete(category.id)}
                      />
                      <Popover
                        returnFocusOnClose={false}
                        isOpen={category.id === toDelete}
                        onClose={() => setToDelete(null)}
                        placement="right"
                        closeOnBlur={false}
                      >
                        <PopoverTrigger>
                          <span></span>
                        </PopoverTrigger>
                        <PopoverContent>
                          <PopoverHeader fontWeight="semibold">
                            Confirmation
                          </PopoverHeader>
                          <PopoverArrow />
                          <PopoverCloseButton />
                          <PopoverBody>
                            Are you sure you want to delete the category &ldquo;
                            {category.title}&ldquo;
                          </PopoverBody>
                          <PopoverFooter
                            display="flex"
                            justifyContent="flex-end"
                          >
                            <ButtonGroup size="sm">
                              <Button
                                onClick={() => setToDelete(null)}
                                variant="outline"
                              >
                                Cancel
                              </Button>
                              <Button
                                onClick={() => handleDelete(category.id)}
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
                })}
                {isCreateMode && (
                  <form
                    className={styles.category_form}
                    onSubmit={(e) => {
                      handleSubmit(e, user.id);
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
                <IconButton
                  colorScheme="teal"
                  variant="ghost"
                  aria-label="Create new"
                  icon={<IoMdAdd />}
                  isDisabled={isCreateMode}
                  onClick={() => setCreate(true)}
                  size="xs"
                />
              </TabList>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
}
