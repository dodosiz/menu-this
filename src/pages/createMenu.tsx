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

export default function CreateMenu() {
  const [isLoading, setLoading] = useState(false);
  const [isCreateMode, setCreate] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});
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
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  return (
    <Layout user={user}>
      <div className={styles.create_menu}>
        {isLoading && <LoadingPage />}
        {!user && !isLoading && <UnauthorizedPage />}
        {user && !isLoading && (
          <>
            <Heading size="xl" as="h1">
              Create Menu
            </Heading>
            <Tabs variant="soft-rounded" colorScheme="teal">
              <TabList className={styles.tablist}>
                {categories.map((category) => (
                  <CategoryTab
                    categories={categories}
                    category={category}
                    setCategories={setCategories}
                    key={"tab-" + category.id}
                  />
                ))}
                {isCreateMode && (
                  <CategoryForm
                    categories={categories}
                    productMap={productMap}
                    setProductMap={setProductMap}
                    handleCancel={() => setCreate(false)}
                    setCategories={setCategories}
                    setCreate={setCreate}
                    user={user}
                    key="create-form"
                  />
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
                      />
                      <ProductsList products={productMap[category.id]} />
                    </TabPanel>
                  );
                })}
              </TabPanels>
            </Tabs>
          </>
        )}
      </div>
    </Layout>
  );
}
