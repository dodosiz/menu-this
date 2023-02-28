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
  message: string;
  onClose: () => void;
}

export function ErrorNotification({ message, onClose }: NotificationProps) {
  return (
    <Alert className={styles.notification} status="error">
      <AlertIcon />
      <Box className={styles.message}>
        <AlertTitle>Error</AlertTitle>
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
