import { Layout } from "@/components/layout";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Divider,
  Heading,
  IconButton,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styles from "@/styles/createMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { Category } from "@prisma/client";
import { CategoryForm } from "@/components/categoryForm";
import { CategoryTab } from "@/components/categoryTab";
import { UnauthorizedPage } from "@/components/unauthorizedPage";
import { ProductForm } from "@/components/productForm";
import { ProductsList } from "@/components/productsList";
import { Auth } from "@supabase/auth-ui-react";
import { MenuData, ProductMap } from "./api/get-menu-data/[userId]";
import { LoadingPage } from "@/components/loadingPage";
import { ErrorNotification } from "@/components/error-notification";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { SECONDARY_COLOR } from "@/styles/constants";

export default function CreateMenu() {
  const [isLoading, setLoading] = useState(false);
  const [isCreateNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [editedCategoryId, setEditedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const { user } = Auth.useUser();

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/get-menu-data/${user.id}`)
        .then((res) => res.json())
        .then((data: MenuData) => {
          setCategories(data.initialCategories);
          setProductMap(data.initialProductMap);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage("Internal server error");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <Layout user={user}>
      <>
        {!!errorMessage.length && (
          <ErrorNotification
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        <div className={styles.create_menu}>
          {isLoading && <LoadingPage fullHeight={true} />}
          {!user && !isLoading && <UnauthorizedPage />}
          {user && !isLoading && (
            <>
              <Heading size="xl" as="h1">
                Create your menu
              </Heading>
              <Tabs variant="soft-rounded" colorScheme="teal">
                <TabList className={styles.tablist}>
                  {categories.map((category) => {
                    if (category.id === editedCategoryId) {
                      return (
                        <CategoryForm
                          categories={categories}
                          productMap={productMap}
                          setProductMap={setProductMap}
                          handleCancel={() => setEditedCategoryId("")}
                          setCategories={setCategories}
                          setCreateNewCategory={setCreateNewCategory}
                          setErrorMessage={setErrorMessage}
                          user={user}
                          categoryInEdit={category}
                          setEditedCategoryId={setEditedCategoryId}
                          key="create-form"
                        />
                      );
                    } else {
                      return (
                        <CategoryTab
                          categories={categories}
                          category={category}
                          setCategories={setCategories}
                          key={"tab-" + category.id}
                          editedCategoryId={editedCategoryId}
                          setErrorMessage={setErrorMessage}
                          setEditedCategoryId={setEditedCategoryId}
                        />
                      );
                    }
                  })}
                  {isCreateNewCategory && (
                    <CategoryForm
                      categories={categories}
                      productMap={productMap}
                      setProductMap={setProductMap}
                      handleCancel={() => setCreateNewCategory(false)}
                      setCategories={setCategories}
                      setCreateNewCategory={setCreateNewCategory}
                      setErrorMessage={setErrorMessage}
                      setEditedCategoryId={setEditedCategoryId}
                      user={user}
                      key="create-form"
                    />
                  )}
                  {!categories.length && !isCreateNewCategory && (
                    <Text className={styles.explanatory} fontSize="md">
                      Click here to create your first product category{" "}
                      <AiOutlineArrowRight />
                    </Text>
                  )}
                  <IconButton
                    colorScheme="teal"
                    variant="ghost"
                    aria-label="Create new"
                    icon={<IoMdAdd />}
                    isDisabled={isCreateNewCategory}
                    onClick={() => setCreateNewCategory(true)}
                    size="md"
                  />
                </TabList>
                <Divider />
                <TabPanels>
                  {categories.map((category) => {
                    return (
                      <TabPanel key={"panel-" + category.id}>
                        <Accordion defaultIndex={0} allowToggle>
                          <AccordionItem>
                            <h2>
                              <AccordionButton
                                paddingLeft={0}
                                color={SECONDARY_COLOR}
                              >
                                <Box as="span" flex="1" textAlign="left">
                                  Add a new product
                                </Box>
                                <AccordionIcon />
                              </AccordionButton>
                            </h2>
                            <AccordionPanel paddingLeft={0} pb={4}>
                              <ProductForm
                                productMap={productMap}
                                setProductMap={setProductMap}
                                categoryId={category.id}
                                setErrorMessage={setErrorMessage}
                              />
                            </AccordionPanel>
                          </AccordionItem>
                        </Accordion>
                        <Heading size="md" as="h3">
                          Products of category{" "}
                          <span className={styles.category_title}>
                            &ldquo;{category.title}&ldquo;
                          </span>
                        </Heading>
                        {!productMap[category.id].length && (
                          <Text className={styles.explanatory} fontSize="md">
                            No products yet, use the above form to create your
                            fist products for this category.
                          </Text>
                        )}
                        <ProductsList
                          productMap={productMap}
                          products={productMap[category.id]}
                          categoryId={category.id}
                          setProductMap={setProductMap}
                          setErrorMessage={setErrorMessage}
                        />
                      </TabPanel>
                    );
                  })}
                </TabPanels>
              </Tabs>
            </>
          )}
        </div>
      </>
    </Layout>
  );
}
