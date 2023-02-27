import { Button, IconButton } from "@chakra-ui/react";
import { ImEye } from "react-icons/im";
import styles from "@/styles/components/viewMenuButtons.module.css";
import { useRouter } from "next/router";

interface ViewMenuButtonsProps {
  menuId: string;
}

export function ViewMenuButtons({ menuId }: ViewMenuButtonsProps) {
  const router = useRouter();
  return (
    <>
      <Button
        leftIcon={<ImEye />}
        colorScheme="teal"
        variant="outline"
        onClick={() => router.push(`/menu/${menuId}`)}
        className={`${styles.view_button} ${styles.view_button_desktop}`}
      >
        View
      </Button>
      <IconButton
        icon={<ImEye />}
        colorScheme="teal"
        aria-label="view"
        variant="outline"
        size="sm"
        onClick={() => router.push(`/menu/${menuId}`)}
        className={`${styles.view_button} ${styles.view_button_mobile}`}
      />
    </>
  );
}
