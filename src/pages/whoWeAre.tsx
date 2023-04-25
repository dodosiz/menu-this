import { Layout } from "@/components/layout";
import {
  Box,
  Center,
  Grid,
  GridItem,
  IconButton,
  Image,
  Link,
  Text,
} from "@chakra-ui/react";
import styles from "@/styles/home.module.css";
import NextLink from "next/link";
import { useRouter } from "next/router";
import { AiOutlineGithub, AiOutlineLinkedin } from "react-icons/ai";

export default function Home() {
  const router = useRouter();
  return (
    <Layout>
      <Box margin="20px 40px">
        <Grid templateColumns="repeat(3, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 3, md: 1 }}>
            <Image
              borderRadius="10px"
              boxSize="200px"
              src="/screen/profile.jpg"
              alt="Theodosios Asvestopoulos"
            />
          </GridItem>
          <GridItem colSpan={{ base: 3, md: 2 }}>
            <Text
              className={styles.banner_text + " " + styles.text_justify}
              fontSize="md"
            >
              Greetings, I am Theodosios Asvestopoulos (short Theo) - a full
              stack developer based in Germany. While savoring my beer at a
              local pub in Aachen, I had an epiphany to create an easy-to-use
              app that aids business owners in crafting online and digital
              menus. Since then, I have been continuously enhancing the app with
              the goal of making life simpler for others. When I&apos;m not
              engrossed in programming, I relish traveling and spending quality
              time with my loved ones. If you wish to provide feedback about the
              app, feel free to contact me on{" "}
              <Link
                as={NextLink}
                href="https://www.linkedin.com/in/theodossios-aswestopoulos-2199b8116/"
              >
                LinkedIn
              </Link>
              ,{" "}
              <Link as={NextLink} href="https://github.com/dodosiz">
                Github
              </Link>{" "}
              or by filling out this anonymous{" "}
              <Link
                as={NextLink}
                href="https://docs.google.com/forms/d/e/1FAIpQLScv9Bg-98EUGdR3tHEE3Ipq1151GuJWFQ7iXY2dZQC8yRnyIQ/viewform?usp=sf_link"
              >
                survey
              </Link>{" "}
              I value and appreciate any input!
            </Text>
          </GridItem>
        </Grid>
        <Center marginTop="20px">
          <IconButton
            colorScheme="linkedin"
            variant="outline"
            borderRadius="full"
            aria-label="LinkedIn"
            marginRight="20px"
            icon={<AiOutlineLinkedin />}
            onClick={() =>
              router.push(
                "https://www.linkedin.com/in/theodossios-aswestopoulos-2199b8116/"
              )
            }
            size="md"
          />
          <IconButton
            colorScheme="gray"
            variant="outline"
            borderRadius="full"
            aria-label="Github"
            icon={<AiOutlineGithub />}
            onClick={() => router.push("https://github.com/dodosiz")}
            size="md"
          />
        </Center>
      </Box>
    </Layout>
  );
}
