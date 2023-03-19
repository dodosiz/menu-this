import { Notification } from "@/components/commons/notification";
import { Layout } from "@/components/commons/layout";
import { useEffect, useState } from "react";
import { LoadingPage } from "@/components/commons/loadingPage";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { Box, Grid, GridItem, Heading, Tooltip } from "@chakra-ui/react";
import { CustomizeDrawer } from "@/components/design-menu/customizeDrawer";
import { MenuViewer } from "@/components/design-menu/menuViewer";
import { TemplateDrawer } from "@/components/design-menu/templateDrawer";
import { ViewMenuButtons } from "@/components/design-menu/viewMenuButtons";
import { Menu, MenuDTO, UpdateDesignData } from "@/lib/data/menu";
import { Router } from "next/router";
import { BASE_MENU, templateToMenu } from "@/lib/data/template-data";
import styles from "@/styles/designMenu.module.css";
import Image from "next/image";
import { ActionPage } from "@/components/commons/actionPage";
import { auth } from "@/lib/config/firebase";
import { Brand, getBrandDocumentReference } from "@/lib/data/brand";
import { onSnapshot, Unsubscribe } from "firebase/firestore";
import { DesignMenuData } from "./api/menu/get-menu-design/[userId]";
import { Category } from "@/lib/data/categories";
import { Product } from "@/lib/data/products";

export default function DesignMenu() {
  const user = auth.currentUser;
  const [isLoading, setLoading] = useState(false);
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<Brand | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [isCustomDrawerOpen, setCustomDrawerOpen] = useState(false);
  const [isTemplateDrawerOpen, setTemplateDrawerOpen] = useState(false);
  const [isCustomDirty, setCustomDirty] = useState(false);
  const [isTemplateDirty, setTemplateDirty] = useState(false);
  const [isBackgroundDirty, setBackgroundDirty] = useState(false);
  const [brandLoaded, setBrandLoaded] = useState(false);

  function pendingLoading() {
    return isLoading || !brandLoaded || isRouteLoading;
  }

  useEffect(() => {
    let unsubscribeBrand: Unsubscribe | undefined;
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
    }
    return () => {
      if (!!unsubscribeBrand) {
        unsubscribeBrand();
      }
    };
  });

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/menu/get-menu-design/${user.uid}`)
        .then((res) => res.json())
        .then((data: DesignMenuData) => {
          setCategories(data.categories);
          setProducts(data.products);
          setMenu(data.menu);
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

  function getConfirmMessage(
    isCustomDirty: boolean,
    isTemplateDirty: boolean,
    isBackgroundDirty: boolean
  ) {
    const sections = [];
    if (isCustomDirty) {
      sections.push('"Customize"');
    }
    if (isTemplateDirty) {
      sections.push('"Template"');
    }
    if (isBackgroundDirty) {
      sections.push('"Category Background"');
    }
    return `Leave without applying the changes in ${sections.join(", ")}?`;
  }

  useEffect(() => {
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      const confirmationMessage = getConfirmMessage(
        isCustomDirty,
        isTemplateDirty,
        isBackgroundDirty
      );
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    if (isCustomDirty || isTemplateDirty) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
    };
  }, [isCustomDirty, isTemplateDirty, isBackgroundDirty]);

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

  async function updateDesign() {
    if (!menu || !user) {
      return;
    }
    const updateMenuData: MenuDTO = {
      brandColor: menu.brandColor,
      titleColor: menu.titleColor,
      nameColor: menu.nameColor,
      descriptionColor: menu.descriptionColor,
      backgroundColor: menu.backgroundColor,
      brandMargin: menu.brandMargin,
      titleMargin: menu.titleMargin,
      nameMargin: menu.nameMargin,
      nameTitleMargin: menu.nameTitleMargin,
      brandSize: menu.brandSize,
      titleSize: menu.titleSize,
      nameSize: menu.nameSize,
      descriptionSize: menu.descriptionSize,
      brandFont: menu.brandFont,
      titleFont: menu.titleFont,
      contentFont: menu.contentFont,
      userId: user.uid,
    };
    const data: UpdateDesignData = {
      categories,
      menu: updateMenuData,
      template: menu.template,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setLoading(true);
    const response = await fetch("/api/menu/update-design", options);
    if (response.status === 200) {
      setLoading(false);
      setCustomDirty(false);
      setTemplateDirty(false);
      setBackgroundDirty(false);
    } else if (response.status === 500) {
      setErrorMessage("Failed to update menu");
      setLoading(false);
    }
  }

  async function createMenu(menu: Menu) {
    if (!user) {
      return;
    }
    const data: MenuDTO = {
      brandColor: menu.brandColor,
      titleColor: menu.titleColor,
      nameColor: menu.nameColor,
      descriptionColor: menu.descriptionColor,
      backgroundColor: menu.backgroundColor,
      brandMargin: menu.brandMargin,
      titleMargin: menu.titleMargin,
      nameMargin: menu.nameMargin,
      nameTitleMargin: menu.nameTitleMargin,
      brandSize: menu.brandSize,
      titleSize: menu.titleSize,
      nameSize: menu.nameSize,
      descriptionSize: menu.descriptionSize,
      brandFont: menu.brandFont,
      titleFont: menu.titleFont,
      contentFont: menu.contentFont,
      userId: user.uid,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch("/api/menu/create-menu", options);
    if (response.status === 500) {
      setErrorMessage("Failed to create menu");
    }
  }

  function setBackground(categoryId: string, background: string | null) {
    const updatedCategories = categories.map((c) => {
      return c.id === categoryId
        ? {
            ...c,
            background,
          }
        : c;
    });
    setCategories(updatedCategories);
    setBackgroundDirty(true);
  }

  return (
    <Layout
      user={user}
      unsavedChanges={isTemplateDirty || isCustomDirty || isBackgroundDirty}
      confirmMessage={getConfirmMessage(
        isCustomDirty,
        isTemplateDirty,
        isBackgroundDirty
      )}
      discardUnsavedChanges={() => {
        setTemplateDirty(false);
        setCustomDirty(false);
        setBackgroundDirty(false);
      }}
    >
      <>
        {!!errorMessage.length && (
          <Notification
            status="error"
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        <div>
          {pendingLoading() && <LoadingPage fullHeight={true} />}
          {(!user || !user.emailVerified) && !pendingLoading() && (
            <UnauthorizedPage />
          )}
          {user && !pendingLoading() && !brand && (
            <ActionPage
              action="Create your brand"
              title="You need to create your brand first"
              destination="/createMenu"
            />
          )}
          {user && !pendingLoading() && brand && !categories.length && (
            <ActionPage
              action="Add categories"
              title="Maybe add some categories with products first?"
              destination="/createMenu"
            />
          )}
          {!menu &&
            !pendingLoading() &&
            user &&
            brand &&
            !!categories.length && (
              <>
                <Heading size="xl" as="h1">
                  Choose a template
                </Heading>
                <Box padding={5}>
                  <Grid templateColumns="repeat(3, 1fr)" gap={10}>
                    {Object.keys(templateToMenu).map((templateName) => (
                      <GridItem colSpan={{ base: 3, md: 1 }} key={templateName}>
                        <Tooltip hasArrow bg="teal.500" label={templateName}>
                          <Image
                            width={600}
                            height={600}
                            className={styles.template_image}
                            src={`/templates/${templateName}.PNG`}
                            alt={templateName}
                            onClick={() => {
                              const newMenu = {
                                id: "",
                                userId: user.uid,
                                ...BASE_MENU,
                                ...templateToMenu[templateName],
                                template: templateName,
                              };
                              setMenu(newMenu);
                              createMenu(newMenu);
                            }}
                          />
                        </Tooltip>
                      </GridItem>
                    ))}
                  </Grid>
                </Box>
              </>
            )}
          {user &&
            !pendingLoading() &&
            menu &&
            brand &&
            !!categories.length && (
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={4}>
                  <MenuViewer
                    categories={categories}
                    setBackground={setBackground}
                    products={products}
                    menu={menu}
                    inEdit={true}
                    brand={brand}
                  />
                </GridItem>
                <GridItem colSpan={1}>
                  <TemplateDrawer
                    menu={menu}
                    setMenu={setMenu}
                    isTemplateDrawerOpen={isTemplateDrawerOpen}
                    setTemplateDrawerOpen={setTemplateDrawerOpen}
                    setTemplateDirty={setTemplateDirty}
                  />
                  <CustomizeDrawer
                    isCustomDrawerOpen={isCustomDrawerOpen}
                    setCustomDrawerOpen={setCustomDrawerOpen}
                    menu={menu}
                    setMenu={setMenu}
                    setCustomDirty={setCustomDirty}
                  />
                  <ViewMenuButtons
                    userId={user.uid}
                    updateDesign={updateDesign}
                  />
                </GridItem>
              </Grid>
            )}
        </div>
      </>
    </Layout>
  );
}
