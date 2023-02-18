import { Layout } from "@/components/layout";
import { Auth } from "@supabase/auth-ui-react";
import { Heading } from "@chakra-ui/react";
import { Text } from "@chakra-ui/react";
import styles from "@/styles/home.module.css";
import { Divider } from "@chakra-ui/react";
import { Button } from "@chakra-ui/react";
import { FaArrowRight } from "react-icons/fa";

export default function Home() {
  const { user } = Auth.useUser();

  return (
    <Layout user={user}>
      <>
        <div className={styles.banner}>
          <Heading className={styles.banner_header} as="h1">
            Create your{" "}
            <span className={styles.banner_header_coloured}>online menu</span>
          </Heading>
          <Text className={styles.banner_text} fontSize="md">
            Use our tool to create the menu of your business online. Create
            categories and add products with prices, this is all you need to do.
            Everything else, like the URL and the QR code for the menu is done
            by us.
          </Text>
          <Button
            className={styles.banner_button}
            colorScheme="teal"
            variant="solid"
            rightIcon={<FaArrowRight />}
          >
            Create Your Menu
          </Button>
        </div>
        <Divider />
      </>
    </Layout>
  );
}
