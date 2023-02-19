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
import { useState } from "react";
import styles from "@/styles/createMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { NextApiRequest } from "next";
import { supabase } from "@/lib/supabase";
import { getCategories } from "@/lib/categories";
import { User } from "@supabase/supabase-js";
import { Category, Product } from "@prisma/client";
import { getTokenFromCookie } from "@/lib/cookies";
import { CategoryForm } from "@/components/categoryForm";
import { CategoryTab } from "@/components/categoryTab";
import { UnauthorizedPage } from "@/components/unauthorizedPage";
import { ProductForm } from "@/components/productForm";
import { getProductsInCategories } from "@/lib/products";
import { ProductsList } from "@/components/productsList";

export async function getServerSideProps({ req }: { req: NextApiRequest }) {
  const token = await getTokenFromCookie(req);
  const unauthenticatedProps = {
    props: {
      authorized: false,
    },
  };
  if (!token) {
    return unauthenticatedProps;
  }

  const { data } = await supabase.auth.getUser(token.access_token);
  if (!data.user) {
    return unauthenticatedProps;
  }

  const initialCategories = await getCategories(data.user.id);
  const categoryIds = initialCategories.map((c) => c.id);
  const products = await getProductsInCategories(categoryIds);
  const initialProductMap: ProductMap = {};
  for (const category of initialCategories) {
    const productsInCategory = products.filter(
      (p) => p.categoryId === category.id
    );
    initialProductMap[category.id] = productsInCategory;
  }

  return {
    props: {
      authorized: true,
      user: data.user,
      initialCategories,
      initialProductMap,
    },
  };
}

export type ProductMap = { [categoryId: string]: Product[] };

interface CreateMenuProps {
  authorized: boolean;
  user: User;
  initialCategories: Category[];
  initialProductMap: ProductMap;
}

export default function CreateMenu({
  authorized,
  user,
  initialCategories,
  initialProductMap,
}: CreateMenuProps) {
  const [isCreateMode, setCreate] = useState(false);
  const [categories, setCategories] = useState<Category[]>(initialCategories);
  const [productMap, setProductMap] = useState<ProductMap>(initialProductMap);

  return (
    <Layout user={user}>
      <div className={styles.create_menu}>
        {!authorized && <UnauthorizedPage />}
        {authorized && (
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
