import { Notification } from "@/components/commons/notification";
import { Layout } from "@/components/commons/layout";
import { Brand, Category, Menu } from "@prisma/client";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import { ProductMap } from "./api/menu/get-menu-data/[userId]";
import { LoadingPage } from "@/components/commons/loadingPage";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { Box, Grid, GridItem, Heading, Tooltip } from "@chakra-ui/react";
import { CustomizeDrawer } from "@/components/design-menu/customizeDrawer";
import { MenuViewer } from "@/components/design-menu/menuViewer";
import { DesignMenuData } from "./api/menu/get-menu-design/[userId]";
import { TemplateDrawer } from "@/components/design-menu/templateDrawer";
import { ViewMenuButtons } from "@/components/design-menu/viewMenuButtons";
import {
  CreateMenuData,
  UpdateDesignData,
  UpdateMenuData,
} from "@/lib/data/menu";
import { Router } from "next/router";
import { BASE_MENU, templateToMenu } from "@/lib/data/template-data";
import styles from "@/styles/designMenu.module.css";
import Image from "next/image";
import { ActionPage } from "@/components/commons/actionPage";

export default function DesignMenu() {
  const { user } = Auth.useUser();
  const [isLoading, setLoading] = useState(false);
  const [isRouteLoading, setRouteLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [brand, setBrand] = useState<Brand | null>(null);
  const [menu, setMenu] = useState<Menu | null>(null);
  const [isCustomDrawerOpen, setCustomDrawerOpen] = useState(false);
  const [isTemplateDrawerOpen, setTemplateDrawerOpen] = useState(false);
  const [isCustomDirty, setCustomDirty] = useState(false);
  const [isTemplateDirty, setTemplateDirty] = useState(false);
  const [isBackgroundDirty, setBackgroundDirty] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/menu/get-menu-design/${user.id}`)
        .then((res) => res.json())
        .then((data: DesignMenuData) => {
          setCategories(data.categories);
          setProductMap(data.productMap);
          setMenu(data.menu);
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
    if (!menu) {
      return;
    }
    const updateMenuData: UpdateMenuData = {
      menuId: menu.id,
      titleColor: menu.title_color,
      nameColor: menu.name_color,
      descriptionColor: menu.description_color,
      backgroundColor: menu.background_color,
      titleMargin: menu.title_margin,
      nameMargin: menu.name_margin,
      nameTitleMargin: menu.name_title_margin,
      titleSize: menu.title_size,
      nameSize: menu.name_size,
      descriptionSize: menu.description_size,
      titleFont: menu.title_font,
      contentFont: menu.content_font,
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
    const data: CreateMenuData = {
      menuId: menu.id,
      titleColor: menu.title_color,
      nameColor: menu.name_color,
      descriptionColor: menu.description_color,
      backgroundColor: menu.background_color,
      titleMargin: menu.title_margin,
      nameMargin: menu.name_margin,
      nameTitleMargin: menu.name_title_margin,
      titleSize: menu.title_size,
      nameSize: menu.name_size,
      descriptionSize: menu.description_size,
      titleFont: menu.title_font,
      contentFont: menu.content_font,
      userId: user.id,
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
    if (response.status === 200) {
      const result = await response.json();
      setMenu({
        ...menu,
        id: result.id,
      });
    } else if (response.status === 500) {
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
          {(isLoading || isRouteLoading) && <LoadingPage fullHeight={true} />}
          {!user && !isLoading && !isRouteLoading && <UnauthorizedPage />}
          {user && !isLoading && !isRouteLoading && !brand && (
            <ActionPage
              action="Create your brand"
              title="You need to create your brand first"
              destination="/createMenu"
            />
          )}
          {user &&
            !isLoading &&
            !isRouteLoading &&
            brand &&
            !categories.length && (
              <ActionPage
                action="Add categories"
                title="Maybe add some categories with products first?"
                destination="/createMenu"
              />
            )}
          {!menu &&
            !isLoading &&
            !isRouteLoading &&
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
                                userId: user.id,
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
            !isLoading &&
            !isRouteLoading &&
            menu &&
            brand &&
            !!categories.length && (
              <Grid templateColumns="repeat(5, 1fr)" gap={4}>
                <GridItem colSpan={4}>
                  <MenuViewer
                    categories={categories}
                    setBackground={setBackground}
                    productMap={productMap}
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
                    menuId={menu.id}
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
