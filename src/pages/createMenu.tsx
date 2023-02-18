import { Layout } from "@/components/layout";
import { Container, Heading, Link } from "@chakra-ui/react";
import { Auth } from "@supabase/auth-ui-react";
import styles from "@/styles/createMenu.module.css";
import NextLink from "next/link";

export default function CreateMenu() {
  const { user } = Auth.useUser();

  return (
    <Layout user={user}>
      <Container className={styles.create_menu}>
        {!user && (
          <Heading size="xl" as="h1">
            You need to{" "}
            <Link href="/login" as={NextLink}>
              log in
            </Link>{" "}
            first
          </Heading>
        )}
      </Container>
    </Layout>
  );
}
