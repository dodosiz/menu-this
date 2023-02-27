import { Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { ImEye, ImQrcode } from "react-icons/im";
import styles from "@/styles/components/viewMenuButtons.module.css";
import { useRouter } from "next/router";
import { QrDialog } from "./qrModalDialog";

interface ViewMenuButtonsProps {
  menuId: string;
}

export function ViewMenuButtons({ menuId }: ViewMenuButtonsProps) {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  return (
    <>
      <QrDialog
        isOpen={showQR}
        setOpen={setShowQR}
        url={`${window.location.origin}/menu/${menuId}`}
      />
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
      <Button
        leftIcon={<ImQrcode />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setShowQR(true)}
        className={`${styles.qr_button} ${styles.qr_button_desktop}`}
      >
        View
      </Button>
      <IconButton
        icon={<ImQrcode />}
        colorScheme="teal"
        aria-label="qr code"
        variant="outline"
        size="sm"
        onClick={() => setShowQR(true)}
        className={`${styles.qr_button} ${styles.qr_button_mobile}`}
      />
    </>
  );
}
