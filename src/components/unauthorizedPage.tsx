import { Heading, Link } from "@chakra-ui/react";
import NextLink from "next/link";
import styles from "@/styles/components/unauthorizedPage.module.css";

export function UnauthorizedPage() {
  return (
    <div className={styles.unauthorized_page}>
      <Heading size="xl" as="h1">
        You need to{" "}
        <Link href="/login" as={NextLink}>
          log in
        </Link>{" "}
        first
      </Heading>
    </div>
  );
}
