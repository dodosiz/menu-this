import {
  Button,
  Flex,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tooltip,
  useClipboard,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { MdContentCopy } from "react-icons/md";

interface ShareDialogProps {
  url: string;
  isOpen: boolean;
  setOpen: (_b: boolean) => void;
}

export function ShareDialog({ url, isOpen, setOpen }: ShareDialogProps) {
  const { onCopy, value, setValue, hasCopied } = useClipboard("");
  useEffect(() => {
    setValue(url);
  });
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Share menu link</ModalHeader>
        <ModalCloseButton />

        <ModalBody>
          <Flex mb={2}>
            <Input value={value} onChange={() => {}} mr={2} />
            <Tooltip label={hasCopied ? "Copied!" : "Copy"}>
              <IconButton
                icon={<MdContentCopy />}
                onClick={onCopy}
                variant="unstyled"
                size="lg"
                aria-label="copy link"
              />
            </Tooltip>
          </Flex>
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
