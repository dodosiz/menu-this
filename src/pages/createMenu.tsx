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
import { CategoryInlineForm } from "@/components/create-menu/category/categoryInlineForm";
import { CategoryTab } from "@/components/create-menu/category/categoryTab";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { ProductsList } from "@/components/create-menu/product/productsList";
import { LoadingPage } from "@/components/commons/loadingPage";
import { Notification } from "@/components/commons/notification";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AccordionWithProductForm } from "@/components/create-menu/product/accordionWithProductForm";
import { CategoryMobileView } from "@/components/create-menu/category/categoryMobileView";
import { CategoryMobileSelect } from "@/components/create-menu/category/categoryMobileSelect";
import { swapDates } from "@/components/create-menu/category/categoryFormHandler";
import { Router } from "next/router";
import { CATEGORY_LIMIT } from "@/constants";
import { CreateBrand } from "@/components/create-menu/brand/createBrand";
import { EditBrand } from "@/components/create-menu/brand/editBrand";
import { auth } from "@/lib/config/firebase";
import { Brand } from "@/lib/data/brand";
import { Category } from "@/lib/data/categories";
import { Product, SwapResult, UpdateProductResult } from "@/lib/data/products";
import { MenuData } from "./api/menu/[userId]";

export default function CreateMenu() {
  const [isLoading, setLoading] = useState(false);
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [isCreateNewCategory, setCreateNewCategory] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [editedCategoryId, setEditedCategoryId] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [expanded, setExpanded] = useState(0);
  const [tabIndex, setTabIndex] = useState(0);
  const user = auth.currentUser;

  function pendingLoading() {
    if (!user) {
      return false;
    }
    return isLoading || isRouteLoading;
  }

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/menu/${user.uid}`)
        .then((res) => res.json())
        .then((data: MenuData) => {
          setCategories(data.categories);
          setProducts(data.products);
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

  function addProduct(p: Product) {
    setProducts([...products, p]);
  }

  function removeProduct(id: string) {
    const newProducts = products.filter((p) => p.id !== id);
    setProducts(newProducts);
  }

  function mergeProduct(r: UpdateProductResult) {
    const updatedProducts = products.map((p) => {
      if (p.id === r.productId) {
        return {
          ...p,
          name: r.name,
          description: r.description,
          price: r.price,
          secondPrice: r.secondPrice,
        };
      }
      return p;
    });
    setProducts(updatedProducts);
  }

  function swapProducts(r: SwapResult) {
    const updatedProducts = products.map((p) => {
      if (p.id === r.id1) {
        return {
          ...p,
          createdAt: r.createdAt1,
        };
      } else if (p.id === r.id2) {
        return {
          ...p,
          createdAt: r.createdAt2,
        };
      }
      return p;
    });
    setProducts(updatedProducts);
  }

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
          {pendingLoading() && <LoadingPage fullHeight={true} />}
          {(!user || !user.emailVerified) && !pendingLoading() && (
            <UnauthorizedPage />
          )}
          {user && !pendingLoading() && !brand && (
            <CreateBrand
              setErrorMessage={setErrorMessage}
              userId={user.uid}
              setBrand={setBrand}
            />
          )}
          {user && !pendingLoading() && !!brand && (
            <>
              <Heading size="xl" as="h1">
                Menu of &quot;{brand.title}&quot;
                <EditBrand
                  brand={brand}
                  user={user}
                  setBrand={setBrand}
                  setErrorMessage={setErrorMessage}
                  setLoading={setLoading}
                />
              </Heading>
              <Box className={styles.mobile_categories}>
                {!!categories.length && (
                  <CategoryMobileSelect
                    categories={categories}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                  />
                )}
                <CategoryMobileView
                  categories={categories}
                  setCategories={setCategories}
                  handleCancel={() => setCreateNewCategory(false)}
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
                            userId: user.uid,
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
                            userId: user.uid,
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
                    .sort((c1, c2) => c1.createdAt - c2.createdAt)
                    .map((category, index) => {
                      if (category.id === editedCategoryId) {
                        return (
                          <CategoryInlineForm
                            categories={categories}
                            setCategories={setCategories}
                            handleCancel={() => setEditedCategoryId("")}
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
                            setCategories={setCategories}
                            category={category}
                            index={index}
                            userId={user.uid}
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
                    <CategoryInlineForm
                      categories={categories}
                      setCategories={setCategories}
                      handleCancel={() => setCreateNewCategory(false)}
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
                    const productsForCategory = products.filter(
                      (p) => p.categoryId === category.id
                    );
                    return (
                      <TabPanel key={"panel-" + category.id}>
                        <AccordionWithProductForm
                          expanded={expanded}
                          products={productsForCategory}
                          categoryId={category.id}
                          setErrorMessage={setErrorMessage}
                          userId={user.uid}
                          setExpanded={setExpanded}
                          addProduct={addProduct}
                          mergeProduct={mergeProduct}
                        />
                        <Heading size="md" as="h3">
                          Products of category{" "}
                          <span className={styles.category_title}>
                            &ldquo;{category.title}&ldquo;
                          </span>
                        </Heading>
                        {!productsForCategory.length && (
                          <Text className={styles.explanatory} fontSize="md">
                            No products yet, use the above form to create your
                            fist products for this category.
                          </Text>
                        )}
                        <ProductsList
                          products={productsForCategory}
                          userId={user.uid}
                          categoryId={category.id}
                          setErrorMessage={setErrorMessage}
                          addProduct={addProduct}
                          mergeProduct={mergeProduct}
                          removeProduct={removeProduct}
                          swapProducts={swapProducts}
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
