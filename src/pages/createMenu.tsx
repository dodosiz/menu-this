import { Layout } from "@/components/commons/layout";
import {
  Box,
  Divider,
  Heading,
  IconButton,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Tooltip,
} from "@chakra-ui/react";
import { useState, useEffect } from "react";
import styles from "@/styles/createMenu.module.css";
import { IoMdAdd } from "react-icons/io";
import { Brand, Category } from "@prisma/client";
import { CategoryForm } from "@/components/create-menu/category/categoryForm";
import { CategoryTab } from "@/components/create-menu/category/categoryTab";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { ProductsList } from "@/components/create-menu/product/productsList";
import { Auth } from "@supabase/auth-ui-react";
import { MenuData, ProductMap } from "./api/menu/get-menu-data/[userId]";
import { LoadingPage } from "@/components/commons/loadingPage";
import { Notification } from "@/components/commons/notification";
import { AiOutlineArrowRight, AiOutlineArrowUp } from "react-icons/ai";
import { AccordionWithProductForm } from "@/components/create-menu/product/accordionWithProductForm";
import { CategoryMobileForm } from "@/components/create-menu/category/categoryMobileForm";
import { CategoryMobileMenu } from "@/components/create-menu/category/categoryMobileMenu";
import { swapDates } from "@/components/create-menu/category/categoryFormHandler";
import { Router } from "next/router";
import { CATEGORY_LIMIT } from "@/constants";
import { CreateBrand } from "@/components/create-menu/brand/createBrand";

export default function CreateMenu() {
  const [isLoading, setLoading] = useState(false);
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [isCreateNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [brand, setBrand] = useState<Brand | null>(null);
  const [editedCategoryId, setEditedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expanded, setExpanded] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const { user } = Auth.useUser();

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/menu/get-menu-data/${user.id}`)
        .then((res) => res.json())
        .then((data: MenuData) => {
          setCategories(data.initialCategories);
          setProductMap(data.initialProductMap);
          setBrand(data.brand);
          setLoading(false);
        })
        .catch(() => {
          setErrorMessage("Failed to fetch menu data");
          setLoading(false);
        });
    } else {
      setLoading(false);
    }
  }, [user]);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setRouteLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setRouteLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setRouteLoading(false);
    });
  });

  return (
    <Layout user={user}>
      <>
        {!!errorMessage.length && (
          <Notification
            status="error"
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        <div className={styles.create_menu}>
          {(isLoading || isRouteLoading) && <LoadingPage fullHeight={true} />}
          {!user && !isLoading && !isRouteLoading && <UnauthorizedPage />}
          {user && !isLoading && !isRouteLoading && !brand && (
            <CreateBrand
              setBrand={setBrand}
              setErrorMessage={setErrorMessage}
              setLoading={setLoading}
              userId={user.id}
            />
          )}
          {user && !isLoading && !isRouteLoading && !!brand && (
            <>
              <Heading size="xl" as="h1">
                Menu of &quot;{brand.title}&quot;
              </Heading>
              <Box className={styles.mobile_categories}>
                {!!categories.length && (
                  <CategoryMobileMenu
                    categories={categories}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                  />
                )}
                <CategoryMobileForm
                  categories={categories}
                  productMap={productMap}
                  setProductMap={setProductMap}
                  handleCancel={() => setCreateNewCategory(false)}
                  setCategories={setCategories}
                  setCreateNewCategory={setCreateNewCategory}
                  setErrorMessage={setErrorMessage}
                  categoryInEdit={
                    editedCategoryId.length > 0
                      ? categories.find((c) => c.id === editedCategoryId)
                      : undefined
                  }
                  setEditedCategoryId={setEditedCategoryId}
                  currentCategory={categories[tabIndex]}
                  tabIndex={tabIndex}
                  setTabIndex={setTabIndex}
                  user={user}
                  onMoveUp={
                    categories[tabIndex - 1]
                      ? () =>
                          swapDates({
                            id1: categories[tabIndex].id,
                            id2: categories[tabIndex - 1].id,
                            categories: categories,
                            setCategories: setCategories,
                            setErrorMessage: setErrorMessage,
                            updateTabIndex: () => setTabIndex(tabIndex - 1),
                          })
                      : undefined
                  }
                  onMoveDown={
                    categories[tabIndex + 1]
                      ? () =>
                          swapDates({
                            id1: categories[tabIndex].id,
                            id2: categories[tabIndex + 1].id,
                            categories: categories,
                            setCategories: setCategories,
                            setErrorMessage: setErrorMessage,
                            updateTabIndex: () => setTabIndex(tabIndex + 1),
                          })
                      : undefined
                  }
                />
              </Box>
              <Tabs
                index={tabIndex}
                onChange={(i) => setTabIndex(i)}
                variant="soft-rounded"
                colorScheme="teal"
              >
                <TabList className={styles.tablist}>
                  {categories
                    .sort(
                      (c1, c2) =>
                        Date.parse(`${c1.created_at}`) -
                        Date.parse(`${c2.created_at}`)
                    )
                    .map((category, index) => {
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
                            setTabIndex={setTabIndex}
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
                            index={index}
                            setCategories={setCategories}
                            key={"tab-" + category.id}
                            editedCategoryId={editedCategoryId}
                            setErrorMessage={setErrorMessage}
                            setEditedCategoryId={setEditedCategoryId}
                            setTabIndex={setTabIndex}
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
                      setTabIndex={setTabIndex}
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
                  <Tooltip
                    label={
                      categories.length >= CATEGORY_LIMIT
                        ? `Maximum limit of ${CATEGORY_LIMIT} categories reached`
                        : undefined
                    }
                  >
                    <IconButton
                      colorScheme="teal"
                      variant="ghost"
                      aria-label="Create new"
                      icon={<IoMdAdd />}
                      isDisabled={
                        isCreateNewCategory ||
                        categories.length >= CATEGORY_LIMIT
                      }
                      onClick={() => setCreateNewCategory(true)}
                      size="md"
                    />
                  </Tooltip>
                </TabList>
                <Divider />
                <TabPanels>
                  {categories.map((category) => {
                    return (
                      <TabPanel key={"panel-" + category.id}>
                        <AccordionWithProductForm
                          expanded={expanded}
                          productMap={productMap}
                          setProductMap={setProductMap}
                          categoryId={category.id}
                          setErrorMessage={setErrorMessage}
                          setExpanded={setExpanded}
                        />
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
