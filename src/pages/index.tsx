import { Layout } from "@/components/commons/layout";
import { Auth } from "@supabase/auth-ui-react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import styles from "@/styles/home.module.css";
import { Divider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import { Router, useRouter } from "next/router";
import { useEffect, useState } from "react";
import { LoadingPage } from "@/components/commons/loadingPage";

export default function Home() {
  const { user } = Auth.useUser();
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    Router.events.on("routeChangeStart", () => {
      setLoading(true);
    });

    Router.events.on("routeChangeComplete", () => {
      setLoading(false);
    });

    Router.events.on("routeChangeError", () => {
      setLoading(false);
    });
  });

  return (
    <Layout user={user}>
      <>
        <div className={styles.banner}>
          {isLoading && <LoadingPage fullHeight={true} />}
          {!isLoading && (
            <>
              <Heading size="xl" className={styles.banner_header} as="h1">
                Create your{" "}
                <span className={styles.banner_header_coloured}>
                  online menu
                </span>
              </Heading>
              <Text className={styles.banner_text} fontSize="md">
                Use our tool to create the menu of your business online.
                <br /> Create categories and add products, this is all you need
                to do.
                <br /> Everything else is done by us.
              </Text>
              <Button
                className={styles.banner_button}
                colorScheme="teal"
                variant="solid"
                rightIcon={<FaArrowRight />}
                onClick={() => router.push("/createMenu")}
              >
                Create your menu
              </Button>
            </>
          )}
        </div>
        <Divider />
      </>
    </Layout>
  );
}
