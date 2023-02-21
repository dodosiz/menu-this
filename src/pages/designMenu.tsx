import { ErrorNotification } from "@/components/error-notification";
import { Layout } from "@/components/layout";
import { Category } from "@prisma/client";
import { Auth } from "@supabase/auth-ui-react";
import { useEffect, useRef, useState } from "react";
import { MenuData, ProductMap } from "./api/get-menu-data/[userId]";
import { LoadingPage } from "@/components/loadingPage";
import { UnauthorizedPage } from "@/components/unauthorizedPage";
import { Grid, GridItem } from "@chakra-ui/react";
import { DesignDrawer } from "@/components/designDrawer";

export default function DesignMenu() {
  const { user } = Auth.useUser();
  const [isLoading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [productMap, setProductMap] = useState<ProductMap>({});

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
        <div>
          {isLoading && <LoadingPage fullHeight={true} />}
          {!user && !isLoading && <UnauthorizedPage />}
          {user && !isLoading && (
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
              <GridItem colSpan={4}></GridItem>
              <GridItem colSpan={1}>
                <DesignDrawer />
              </GridItem>
            </Grid>
          )}
        </div>
      </>
    </Layout>
  );
}
