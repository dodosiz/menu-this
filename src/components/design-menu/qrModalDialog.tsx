import {
  Button,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";
import { FiDownload } from "react-icons/fi";
import { jsPDF } from "jspdf";
import domtoimage from "dom-to-image";
import styles from "@/styles/components/design-menu/qrModalDialog.module.css";

interface QrDialogProps {
  brandTitle: string;
  brandFont: string;
  backgroundColor: string;
  brandColor: string;
  url: string;
  isOpen: boolean;
  setOpen: (_b: boolean) => void;
}

export function QrDialog({
  url,
  backgroundColor,
  brandColor,
  brandFont,
  brandTitle,
  isOpen,
  setOpen,
}: QrDialogProps) {
  const { Canvas } = useQRCode();
  const downloadQR = () => {
    const qrCode = document.getElementById("qr-code");

    if (qrCode) {
      const qrCodeHeight = qrCode.clientHeight;
      const qrCodeWidth = qrCode.clientWidth;
      const options = {
        background: "white",
        width: qrCodeWidth,
        height: qrCodeHeight,
      };

      domtoimage.toPng(qrCode, options).then((imgData) => {
        const doc = new jsPDF("p", "mm", [210, 297]);
        doc.addImage(imgData, "PNG", 0, 0, 100, 100);
        doc.save("qr_code.pdf");
      });
    }
  };
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Menu QR</ModalHeader>
        <ModalCloseButton />

        <ModalBody className={styles.modal_body}>
          <VStack
            justifyContent="center"
            width={400}
            height={400}
            id="qr-code"
            backgroundColor={backgroundColor}
          >
            <Heading
              fontFamily={brandFont}
              color={brandColor}
              as="h2"
              size="2xl"
              marginBottom={20}
            >
              {brandTitle}
            </Heading>
            <Canvas
              text={url}
              options={{
                level: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: brandColor,
                  light: backgroundColor,
                },
              }}
            />
            <Text color={brandColor}>Scan the QR code to view our menu.</Text>
          </VStack>
        </ModalBody>

        <ModalFooter>
          <Button
            leftIcon={<FiDownload />}
            colorScheme="teal"
            variant="outline"
            marginRight={5}
            onClick={downloadQR}
          >
            Download
          </Button>
          <Button
            variant="outline"
            colorScheme="teal"
            mr={3}
            onClick={() => setOpen(false)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
