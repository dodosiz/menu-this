import { SECONDARY_COLOR } from "@/constants";
import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useQRCode } from "next-qrcode";

interface QrDialogProps {
  url: string;
  isOpen: boolean;
  setOpen: (b: boolean) => void;
}

export function QrDialog({ url, isOpen, setOpen }: QrDialogProps) {
  const { Canvas } = useQRCode();
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Menu QR</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Text color={SECONDARY_COLOR}>
            Use this QR code to let customers scan your menu.
          </Text>
          <Box>
            <Canvas
              text={url}
              options={{
                level: "M",
                margin: 3,
                scale: 4,
                width: 200,
                color: {
                  dark: "#000",
                  light: "#fff",
                },
              }}
            />
          </Box>
        </ModalBody>

        <ModalFooter>
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
