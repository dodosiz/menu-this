import { SECONDARY_COLOR } from "@/constants";
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
import html2pdf from "html2pdf.js";

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
    const element = document.getElementById("qr-code");
    var opt = {
      margin: 1,
      filename: "qr_code.pdf",
      image: { type: "jpeg", quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
    };
    html2pdf(element, opt).save();
    setOpen(false);
  };
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Menu QR</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
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
            >
              {brandTitle}
            </Heading>
            <Text color={brandColor}>Scan the QR code to view our menu.</Text>
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
          </VStack>
          <Text color={SECONDARY_COLOR}>
            Use this QR code to let customers scan your menu.
          </Text>
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
