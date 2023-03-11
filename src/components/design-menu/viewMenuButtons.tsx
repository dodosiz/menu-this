import { Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { ImEye, ImQrcode } from "react-icons/im";
import styles from "@/styles/components/design-menu/viewMenuButtons.module.css";
import { useRouter } from "next/router";
import { QrDialog } from "./qrModalDialog";
import { FaRegSave } from "react-icons/fa";

interface ViewMenuButtonsProps {
  menuId: string;
  updateDesign: () => {};
}

export function ViewMenuButtons({
  menuId,
  updateDesign,
}: ViewMenuButtonsProps) {
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
      <Button
        leftIcon={<FaRegSave />}
        colorScheme="teal"
        variant="outline"
        onClick={() => updateDesign()}
        className={`${styles.save_button} ${styles.save_button_desktop}`}
      >
        Save Changes
      </Button>
      <IconButton
        icon={<ImQrcode />}
        colorScheme="teal"
        aria-label="save changes"
        variant="outline"
        size="sm"
        onClick={() => updateDesign()}
        className={`${styles.save_button} ${styles.save_button_mobile}`}
      />
    </>
  );
}
