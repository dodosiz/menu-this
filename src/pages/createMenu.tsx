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
import { CategoryForm } from "@/components/create-menu/category/categoryForm";
import { CategoryTab } from "@/components/create-menu/category/categoryTab";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { ProductsList } from "@/components/create-menu/product/productsList";
import { LoadingPage } from "@/components/commons/loadingPage";
import { Notification } from "@/components/commons/notification";
import { AiOutlineArrowRight } from "react-icons/ai";
import { AccordionWithProductForm } from "@/components/create-menu/product/accordionWithProductForm";
import { CategoryMobileForm } from "@/components/create-menu/category/categoryMobileForm";
import { CategoryMobileMenu } from "@/components/create-menu/category/categoryMobileMenu";
import { swapDates } from "@/components/create-menu/category/categoryFormHandler";
import { Router } from "next/router";
import { CATEGORY_LIMIT } from "@/constants";
import { CreateBrand } from "@/components/create-menu/brand/createBrand";
import { EditBrand } from "@/components/create-menu/brand/editBrand";
import { auth } from "@/lib/config/firebase";
import { onSnapshot, Unsubscribe } from "firebase/firestore";
import { Brand, getBrandDocumentReference } from "@/lib/data/brand";
import {
  Category,
  getCategoryCollectionReference,
} from "@/lib/data/categories";
import { getProductCollectionReference, Product } from "@/lib/data/products";

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
  const [brandLoaded, setBrandLoaded] = useState(false);
  const [categoriesLoaded, setCategoriesLoaded] = useState(false);
  const [productsLoaded, setProductsLoaded] = useState(false);
  const user = auth.currentUser;

  function pendingLoading() {
    if (!user) {
      return false;
    }
    return (
      isLoading ||
      !brandLoaded ||
      !categoriesLoaded ||
      !productsLoaded ||
      isRouteLoading
    );
  }

  useEffect(() => {
    let unsubscribeBrand: Unsubscribe;
    let unsubscribeCategory: Unsubscribe;
    let unsubscribeProducts: Unsubscribe;
    if (user) {
      unsubscribeBrand = onSnapshot(
        getBrandDocumentReference(user.uid),
        (d) => {
          const data = d.data();
          if (data) {
            setBrand(data);
          }
          setBrandLoaded(true);
        }
      );
      unsubscribeCategory = onSnapshot(
        getCategoryCollectionReference(user.uid),
        (c) => {
          const categories: Category[] = [];
          c.forEach((r) => categories.push(r.data()));
          setCategories(categories);
          setCategoriesLoaded(true);
        }
      );
      unsubscribeProducts = onSnapshot(
        getProductCollectionReference(user.uid),
        (p) => {
          const products: Product[] = [];
          p.forEach((r) => products.push(r.data()));
          setProducts(products);
          setProductsLoaded(true);
        }
      );
    }
    return () => {
      if (!!unsubscribeBrand) {
        unsubscribeBrand();
      }
      if (!!unsubscribeCategory) {
        unsubscribeCategory();
      }
      if (!!unsubscribeProducts) {
        unsubscribeProducts();
      }
    };
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
          {pendingLoading() && <LoadingPage fullHeight={true} />}
          {(!user || !user.emailVerified) && !pendingLoading() && (
            <UnauthorizedPage />
          )}
          {user && !pendingLoading() && !brand && (
            <CreateBrand setErrorMessage={setErrorMessage} userId={user.uid} />
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
                  <CategoryMobileMenu
                    categories={categories}
                    tabIndex={tabIndex}
                    setTabIndex={setTabIndex}
                  />
                )}
                <CategoryMobileForm
                  categories={categories}
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
                          <CategoryForm
                            categories={categories}
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
                    <CategoryForm
                      categories={categories}
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
