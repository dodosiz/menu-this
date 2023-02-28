import styles from "@/styles/components/commons/loadingPage.module.css";
import { Spinner } from "@chakra-ui/react";

interface LoadingPageProps {
  fullHeight?: boolean;
}

export function LoadingPage(props: LoadingPageProps) {
  const className = props.fullHeight
    ? styles.loading_page_full
    : styles.loading_page;
  return (
    <div className={className}>
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
