import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogCloseButton,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { useRef } from "react";

interface LeaveAlertProps {
  confirmMessage: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export function ConfirmDialog({
  confirmMessage,
  isOpen,
  title,
  onClose,
  onConfirm,
}: LeaveAlertProps) {
  const cancelRef = useRef() as any;
  return (
    <AlertDialog
      motionPreset="slideInBottom"
      leastDestructiveRef={cancelRef}
      onClose={onClose}
      isOpen={isOpen}
      isCentered
    >
      <AlertDialogOverlay />

      <AlertDialogContent>
        <AlertDialogHeader>{title}</AlertDialogHeader>
        <AlertDialogCloseButton />
        <AlertDialogBody>{confirmMessage}</AlertDialogBody>
        <AlertDialogFooter>
          <Button variant="outline" ref={cancelRef} onClick={onClose}>
            No
          </Button>
          <Button
            onClick={onConfirm}
            colorScheme="red"
            variant="outline"
            ml={3}
          >
            Yes
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
