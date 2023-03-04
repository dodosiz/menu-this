import { ErrorNotification } from "@/components/commons/error-notification";
import { Layout } from "@/components/commons/layout";
import { Category, Menu } from "@prisma/client";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect, useState } from "react";
import { ProductMap } from "./api/menu/get-menu-data/[userId]";
import { LoadingPage } from "@/components/commons/loadingPage";
import { UnauthorizedPage } from "@/components/commons/unauthorizedPage";
import { Grid, GridItem } from "@chakra-ui/react";
import { CustomizeDrawer } from "@/components/design-menu/customizeDrawer";
import { MenuViewer } from "@/components/design-menu/menuViewer";
import { DesignMenuData } from "./api/menu/get-menu-design/[userId]";
import { TemplateDrawer } from "@/components/design-menu/templateDrawer";
import { ViewMenuButtons } from "@/components/design-menu/viewMenuButtons";
import { UpdateMenuData, UpdateTemplateData } from "@/lib/data/menu";
import { Router } from "next/router";

export default function DesignMenu() {
  const { user } = Auth.useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [menu, setMenu] = useState<Menu | null>(null);
  const [isCustomDrawerOpen, setCustomDrawerOpen] = useState(false);
  const [isTemplateDrawerOpen, setTemplateDrawerOpen] = useState(false);
  const [isCustomDirty, setCustomDirty] = useState(false);
  const [isTemplateDirty, setTemplateDirty] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetch(`/api/menu/get-menu-design/${user.id}`)
        .then((res) => res.json())
        .then((data: DesignMenuData) => {
          setCategories(data.categories);
          setProductMap(data.productMap);
          setMenu(data.menu);
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

  useEffect(() => {
    const confirmationMessage =
      isCustomDirty && !isTemplateDirty
        ? 'Leave without applying the changes in "Customize"?'
        : !isCustomDirty && isTemplateDirty
        ? 'Leave without applying the changes in "Template"?'
        : 'Leave without applying the changes in "Customize" and "Template"?';
    const beforeUnloadHandler = (e: BeforeUnloadEvent) => {
      (e || window.event).returnValue = confirmationMessage;
      return confirmationMessage;
    };
    const beforeRouteHandler = (url: string) => {
      if (url !== window.location.pathname && !confirm(confirmationMessage)) {
        Router.events.emit("routeChangeError");
        throw `Route change to "${url}" was aborted.`;
      }
    };
    if (isCustomDirty || isTemplateDirty) {
      window.addEventListener("beforeunload", beforeUnloadHandler);
      Router.events.on("routeChangeStart", beforeRouteHandler);
    } else {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    }
    return () => {
      window.removeEventListener("beforeunload", beforeUnloadHandler);
      Router.events.off("routeChangeStart", beforeRouteHandler);
    };
  }, [isCustomDirty, isTemplateDirty]);

  async function updateCustomization() {
    if (!menu) {
      return;
    }
    const data: UpdateMenuData = {
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
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setLoading(true);
    const response = await fetch("/api/menu/update-menu", options);
    if (response.status === 200) {
      setLoading(false);
      setCustomDrawerOpen(false);
      setCustomDirty(false);
    } else if (response.status === 500) {
      setErrorMessage("Internal server error");
      setLoading(false);
    }
  }

  async function updateTemplate() {
    if (!menu) {
      return;
    }
    const data: UpdateTemplateData = {
      menuId: menu.id,
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
    const response = await fetch("/api/menu/update-template", options);
    if (response.status === 200) {
      setLoading(false);
      setTemplateDrawerOpen(false);
      setTemplateDirty(false);
    } else if (response.status === 500) {
      setErrorMessage("Internal server error");
      setLoading(false);
    }
  }

  return (
    <Layout user={user}>
      <>
        {!!errorMessage.length && (
          <ErrorNotification
            message={errorMessage}
            onClose={() => setErrorMessage("")}
          />
        )}
        <div>
          {isLoading && <LoadingPage fullHeight={true} />}
          {!user && !isLoading && <UnauthorizedPage />}
          {user && !isLoading && (
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={4}>
                {menu && (
                  <MenuViewer
                    categories={categories}
                    productMap={productMap}
                    menu={menu}
                  />
                )}
              </GridItem>
              <GridItem colSpan={1}>
                {menu && (
                  <TemplateDrawer
                    menu={menu}
                    setMenu={setMenu}
                    isTemplateDrawerOpen={isTemplateDrawerOpen}
                    setTemplateDrawerOpen={setTemplateDrawerOpen}
                    onUpdateTemplate={updateTemplate}
                    setTemplateDirty={setTemplateDirty}
                  />
                )}
                {menu && (
                  <CustomizeDrawer
                    isCustomDrawerOpen={isCustomDrawerOpen}
                    setCustomDrawerOpen={setCustomDrawerOpen}
                    menu={menu}
                    setMenu={setMenu}
                    onUpdateCustomization={updateCustomization}
                    setCustomDirty={setCustomDirty}
                  />
                )}
                {menu && <ViewMenuButtons menuId={menu.id} />}
              </GridItem>
            </Grid>
          )}
        </div>
      </>
    </Layout>
  );
}
