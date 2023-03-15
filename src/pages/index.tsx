import { Layout } from "@/components/commons/layout";
import { Auth } from "@supabase/auth-ui-react";
import { Grid, GridItem, Heading, Image } from "@chakra-ui/react";
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
        {isLoading && <LoadingPage fullHeight={true} />}
        {!isLoading && (
          <>
            <div className={styles.banner}>
              <Heading size="xl" className={styles.banner_header} as="h1">
                Create your <span className={styles.coloured}>online menu</span>
              </Heading>
              <Text className={styles.banner_text} fontSize="md">
                With <strong className={styles.coloured}>DEINLOG</strong>, you
                can easily design and customize your own digital menu that is
                perfect for restaurants, cafes, and other food-related
                businesses.
                <br /> Use our tool to create the menu of your business online.
              </Text>
              <Button
                className={styles.banner_button}
                colorScheme="teal"
                variant="solid"
                rightIcon={<FaArrowRight />}
                minWidth="180px"
                maxWidth="180px"
                onClick={() => router.push("/createMenu")}
              >
                Get started
              </Button>
            </div>
            <Divider />
            <Grid
              className={styles.grid}
              templateColumns="repeat(3, 1fr)"
              gap={4}
            >
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Text
                  className={styles.banner_text + " " + styles.text_justify}
                  fontSize="md"
                >
                  Our menu data management system is designed to make category
                  and product creation, updating, and deletion as easy and
                  intuitive as possible. With our user-friendly interface, you
                  will be able to manage your menu items quickly and
                  efficiently.
                </Text>
              </GridItem>
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Image
                  height="400px"
                  src="/screen/screen1.png"
                  alt="Online menu data"
                />
              </GridItem>
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Image
                  height="400px"
                  src="/screen/screen2.png"
                  alt="Online menu data"
                />
              </GridItem>
            </Grid>
            <Divider />
            <Grid
              className={styles.grid}
              templateColumns="repeat(3, 1fr)"
              gap={4}
            >
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Image
                  height="400px"
                  src="/screen/screen3.png"
                  alt="Online menu data"
                />
              </GridItem>
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Image
                  height="400px"
                  src="/screen/screen4.png"
                  alt="Online menu data"
                />
              </GridItem>
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Text
                  className={styles.banner_text + " " + styles.text_justify}
                  fontSize="md"
                >
                  Our templates are designed to make the process of creating a
                  menu as easy as possible. Simply choose the template that best
                  fits your needs, add your own content, and customize it to
                  your liking. With a few clicks, you can have a
                  professional-looking menu that perfectly represents your
                  brand.
                </Text>
              </GridItem>
            </Grid>
            <Divider />
            <Grid
              className={styles.grid}
              templateColumns="repeat(3, 1fr)"
              gap={4}
            >
              <GridItem
                className={styles.grid_item + " " + styles.grid_item_column}
                colSpan={{ base: 3, md: 1 }}
              >
                <Text
                  className={styles.banner_text + " " + styles.text_justify}
                  fontSize="md"
                >
                  For those who want to take their design to the next level, our
                  app offers powerful customization tools. You can choose from a
                  variety of font styles and colors, adjust the layout, and even
                  add your own images to create a truly unique design.
                  <br />
                  <br />
                  Our app also offers the convenience of an autogenerated QR
                  code for your menu. Simply create your menu, and our app will
                  generate a unique QR code that your customers can easily scan
                  with their smartphones. This saves time and makes it easy for
                  your customers to access your menu quickly and efficiently.
                </Text>
                <Button
                  className={styles.banner_button}
                  colorScheme="teal"
                  variant="solid"
                  rightIcon={<FaArrowRight />}
                  minWidth="180px"
                  maxWidth="180px"
                  onClick={() => router.push("/createMenu")}
                >
                  Start creating
                </Button>
              </GridItem>
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Image
                  height="400px"
                  src="/screen/screen5.png"
                  alt="Online menu data"
                />
              </GridItem>
              <GridItem
                className={styles.grid_item}
                colSpan={{ base: 3, md: 1 }}
              >
                <Image
                  height="400px"
                  src="/screen/screen6.png"
                  alt="Online menu data"
                />
              </GridItem>
            </Grid>
          </>
        )}
      </>
    </Layout>
  );
}
