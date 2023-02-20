import styles from "@/styles/components/loadingPage.module.css";
import { Spinner } from "@chakra-ui/react";

export function LoadingPage() {
  return (
    <div className={styles.loading_page}>
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="teal.500"
        size="xl"
      />
    </div>
  );
}
