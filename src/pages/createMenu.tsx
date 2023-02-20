import { Layout } from "@/components/layout";
import {
  Divider,
  Heading,
  IconButton,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
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
                Create Menu
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
                  <IconButton
                    colorScheme="teal"
                    variant="ghost"
                    aria-label="Create new"
                    icon={<IoMdAdd />}
                    isDisabled={isCreateNewCategory}
                    onClick={() => setCreateNewCategory(true)}
                    size="xs"
                  />
                </TabList>
                <Divider />
                <TabPanels>
                  {categories.map((category) => {
                    return (
                      <TabPanel key={"panel-" + category.id}>
                        <Heading size="md" as="h3">
                          Products of category &ldquo;{category.title}&ldquo;
                        </Heading>
                        <ProductForm
                          productMap={productMap}
                          setProductMap={setProductMap}
                          categoryId={category.id}
                          setErrorMessage={setErrorMessage}
                        />
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
