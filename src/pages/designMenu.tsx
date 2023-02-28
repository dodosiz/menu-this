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

export default function DesignMenu() {
  const { user } = Auth.useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});
  const [menu, setMenu] = useState<Menu | null>(null);

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
                    setErrorMessage={setErrorMessage}
                    menu={menu}
                    setMenu={setMenu}
                    setLoading={setLoading}
                  />
                )}
                {menu && (
                  <CustomizeDrawer
                    setErrorMessage={setErrorMessage}
                    menu={menu}
                    setMenu={setMenu}
                    setLoading={setLoading}
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
