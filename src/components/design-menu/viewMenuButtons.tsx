import { Button, IconButton } from "@chakra-ui/react";
import { useState } from "react";
import { ImEye, ImQrcode } from "react-icons/im";
import styles from "@/styles/components/design-menu/viewMenuButtons.module.css";
import { useRouter } from "next/router";
import { QrDialog } from "./qrModalDialog";
import { FaRegSave, FaShareSquare } from "react-icons/fa";
import { ShareDialog } from "./shareDialog";

interface ViewMenuButtonsProps {
  brandTitle: string;
  userId: string;
  brandFont: string;
  backgroundColor: string;
  descriptionColor: string;
  updateDesign: () => {};
}

export function ViewMenuButtons({
  brandTitle,
  userId,
  backgroundColor,
  descriptionColor,
  brandFont,
  updateDesign,
}: ViewMenuButtonsProps) {
  const router = useRouter();
  const [showQR, setShowQR] = useState(false);
  const [showShare, setShowShare] = useState(false);
  return (
    <>
      <QrDialog
        brandTitle={brandTitle}
        backgroundColor={backgroundColor}
        descriptionColor={descriptionColor}
        brandFont={brandFont}
        isOpen={showQR}
        setOpen={setShowQR}
        url={`${window.location.origin}/menu/${userId}`}
      />
      <ShareDialog
        isOpen={showShare}
        setOpen={setShowShare}
        url={`${window.location.origin}/menu/${userId}`}
      />
      <Button
        leftIcon={<ImEye />}
        colorScheme="teal"
        variant="outline"
        onClick={() => router.push(`/menu/${userId}`)}
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
        onClick={() => router.push(`/menu/${userId}`)}
        className={`${styles.view_button} ${styles.view_button_mobile}`}
      />
      <Button
        leftIcon={<ImQrcode />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setShowQR(true)}
        className={`${styles.qr_button} ${styles.qr_button_desktop}`}
      >
        Menu QR
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
        leftIcon={<FaShareSquare />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setShowShare(true)}
        className={`${styles.share_button} ${styles.share_button_desktop}`}
      >
        Share
      </Button>
      <IconButton
        icon={<FaShareSquare />}
        colorScheme="teal"
        aria-label="share"
        variant="outline"
        size="sm"
        onClick={() => setShowShare(true)}
        className={`${styles.share_button} ${styles.share_button_mobile}`}
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
        icon={<FaRegSave />}
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
