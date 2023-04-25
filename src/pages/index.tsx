import { Layout } from "@/components/layout";
import { Box, Grid, GridItem, Heading, Link, VStack } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import styles from "@/styles/home.module.css";
import { Divider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";
import Image from "next/image";
import NextLink from "next/link";
import { useRouter } from "next/router";

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <>
        <div className={styles.banner}>
          <Heading size="xl" className={styles.banner_header} as="h1">
            Create your <span className={styles.coloured}>online menu</span>
          </Heading>
          <Text className={styles.banner_text} fontSize="md">
            Use{" "}
            <Link as={NextLink} href="https://www.app.deinlog.com/">
              <strong className={styles.coloured}>DEINLOG</strong>
            </Link>{" "}
            to create the perfect menu for your business in just a few clicks!{" "}
          </Text>
          <Button
            className={styles.banner_button}
            colorScheme="teal"
            variant="solid"
            rightIcon={<FaArrowRight />}
            minWidth="180px"
            maxWidth="180px"
            onClick={() => router.push("https://www.app.deinlog.com/")}
          >
            Get started
          </Button>
        </div>
        <hr />
        <Grid className={styles.grid} templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
            <VStack>
              <Heading as="h3" fontSize="3xl" className={styles.step_heading}>
                Step 1
              </Heading>
              <Text
                className={styles.banner_text + " " + styles.text_justify}
                fontSize="md"
              >
                Design and develop a range of products, and organize them into
                different categories.
              </Text>
            </VStack>
          </GridItem>
          <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
            <Image
              height={400}
              width={200}
              src="/screen/screen1.png"
              alt="View your online menu data"
            />
          </GridItem>
          <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
            <Image
              height={400}
              width={200}
              src="/screen/screen2.png"
              alt="Create products for your online menu"
            />
          </GridItem>
        </Grid>
        <Divider />
        <Box className={styles.desktop_only}>
          <Grid
            className={styles.grid}
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
              <Image
                height={400}
                width={200}
                src="/screen/screen3.png"
                alt="Choose templates for your online menu"
              />
            </GridItem>
            <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
              <Image
                height={400}
                width={200}
                src="/screen/screen4.png"
                alt="View the design of your online menu"
              />
            </GridItem>
            <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
              <VStack>
                <Heading as="h3" fontSize="3xl" className={styles.step_heading}>
                  Step 2
                </Heading>
                <Text
                  className={styles.banner_text + " " + styles.text_justify}
                  fontSize="md"
                >
                  Utilize customizable templates and design tools to add a
                  personalized touch to your menu.
                </Text>
              </VStack>
            </GridItem>
          </Grid>
        </Box>
        <Box className={styles.mobile_only}>
          <Grid
            className={styles.grid}
            templateColumns="repeat(3, 1fr)"
            gap={4}
          >
            <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
              <VStack>
                <Heading as="h3" fontSize="3xl" className={styles.step_heading}>
                  Step 2
                </Heading>
                <Text
                  className={styles.banner_text + " " + styles.text_justify}
                  fontSize="md"
                >
                  Utilize customizable templates and design tools to add a
                  personalized touch to your menu.
                </Text>
              </VStack>
            </GridItem>
            <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
              <Image
                height={400}
                width={200}
                src="/screen/screen3.png"
                alt="Choose templates for your online menu"
              />
            </GridItem>
            <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
              <Image
                height={400}
                width={200}
                src="/screen/screen4.png"
                alt="View the design of your online menu"
              />
            </GridItem>
          </Grid>
        </Box>
        <Divider />
        <Grid className={styles.grid} templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem
            className={styles.grid_item + " " + styles.grid_item_column}
            colSpan={{ base: 3, md: 1 }}
          >
            <VStack>
              <Heading as="h3" fontSize="3xl" className={styles.step_heading}>
                Step 3
              </Heading>
              <Text
                className={styles.banner_text + " " + styles.text_justify}
                fontSize="md"
              >
                Generate your printable QR code to impress and engage your
                customers.
              </Text>
            </VStack>
          </GridItem>
          <GridItem className={styles.grid_item} colSpan={{ base: 3, md: 1 }}>
            <Image
              height={800}
              width={800}
              src="/screen/qr.PNG"
              alt="Generate the QR code of the online menu"
            />
          </GridItem>
        </Grid>
        <Divider />
        <div className={styles.banner}>
          <Text className={styles.banner_text} fontSize="md">
            Did we wake up your interest? Take the first step towards
            digitalizing your menu by trying out{" "}
            <Link as={NextLink} href="https://www.app.deinlog.com/">
              <strong className={styles.coloured}>DEINLOG</strong>
            </Link>{" "}
            today! Not only is our app completely free, but as a new potential
            business, we value your feedback to help us improve and provide the
            best possible service. You can give us your feedback by filling out
            this anonymous{" "}
            <Link
              as={NextLink}
              href="https://docs.google.com/forms/d/e/1FAIpQLScv9Bg-98EUGdR3tHEE3Ipq1151GuJWFQ7iXY2dZQC8yRnyIQ/viewform?usp=sf_link"
            >
              survey
            </Link>
            .
          </Text>
          <Button
            className={styles.banner_button}
            colorScheme="teal"
            variant="solid"
            rightIcon={<FaArrowRight />}
            minWidth="180px"
            maxWidth="180px"
            onClick={() => router.push("https://www.app.deinlog.com/")}
          >
            Try for free
          </Button>
        </div>
      </>
    </Layout>
  );
}
