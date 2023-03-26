import { Button, Text } from "@chakra-ui/react";
import styles from "@/styles/home.module.css";
import { FaArrowRight } from "react-icons/fa";
import { useRouter } from "next/router";
import { CategoryProductCount } from "@/lib/data/user";

interface SuggestionProps {
  data: CategoryProductCount;
}

export function Suggestion({ data }: SuggestionProps) {
  const categoryCount = Object.keys(data).length;
  let productCount = 0;
  for (const key of Object.keys(data)) {
    const categoryData = data[key];
    productCount += categoryData.count;
  }
  if (categoryCount === 0) {
    return (
      <>
        <Text className={styles.banner_text} fontSize="md">
          You have not created any categories yet.
        </Text>
        <ActionButton message="Create Categories" path="/createMenu" />
      </>
    );
  } else if (categoryCount > 0 && productCount === 0) {
    return (
      <>
        <Text className={styles.banner_text} fontSize="md">
          You have created some categories, but no products.
        </Text>
        <ActionButton message="Create Products" path="/createMenu" />
      </>
    );
  } else if (categoryCount > 0 && productCount > 0) {
    return (
      <>
        <Text className={styles.banner_text} fontSize="md">
          Seems like you have created some data, if you feel ready start
          designing your menu and enjoy.
        </Text>
        <ActionButton message="Design Menu" path="/designMenu" />
      </>
    );
  } else {
    return <></>;
  }
}

interface ActionButtonMessage {
  message: string;
  path: string;
}

function ActionButton({ message, path }: ActionButtonMessage) {
  const router = useRouter();
  return (
    <Button
      className={styles.banner_button}
      colorScheme="teal"
      variant="solid"
      rightIcon={<FaArrowRight />}
      minWidth="180px"
      maxWidth="180px"
      onClick={() => router.push(path)}
    >
      {message}
    </Button>
  );
}
