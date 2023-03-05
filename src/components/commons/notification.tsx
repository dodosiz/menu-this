import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
  CloseButton,
} from "@chakra-ui/react";
import styles from "@/styles/components/commons/notification.module.css";

interface NotificationProps {
  status: "error" | "info";
  message: string;
  onClose: () => void;
}

export function Notification({ message, onClose, status }: NotificationProps) {
  return (
    <Alert className={styles.notification} status={status}>
      <AlertIcon />
      <Box className={styles.message}>
        {status === "error" && <AlertTitle>Error</AlertTitle>}
        <AlertDescription>{message}</AlertDescription>
      </Box>
      <CloseButton
        alignSelf="flex-start"
        position="relative"
        right={-1}
        top={-1}
        onClick={onClose}
      />
    </Alert>
  );
}
