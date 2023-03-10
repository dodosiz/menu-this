import { BACKGROUND_IMG } from "@/lib/data/template-data";
import {
  Button,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styles from "@/styles/designMenu.module.css";
import { CategoryView } from "@/lib/data/menu-view";

interface ChoosePhotoModalProps {
  categoryId: string | undefined;
  categories: CategoryView[];
  setBackground?: (categoryId: string, background: string | null) => void;
  setCategoryId: (b: string | undefined) => void;
}

export function ChoosePhotoModal({
  categoryId,
  setCategoryId,
  setBackground,
  categories,
}: ChoosePhotoModalProps) {
  const category = categories.find((c) => c.id === categoryId);
  return (
    <Modal
      size="4xl"
      isOpen={categoryId !== undefined}
      onClose={() => setCategoryId(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Background Image for &quot;{category?.title}&quot;
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody maxHeight="50vh" overflowY="scroll">
          <Grid templateColumns="repeat(3, 1fr)" gap={10}>
            {Object.keys(BACKGROUND_IMG).map((id) => (
              <GridItem colSpan={{ base: 3, md: 1 }} key={id}>
                <Image
                  className={styles.template_image}
                  src={BACKGROUND_IMG[id].path}
                  alt={BACKGROUND_IMG[id].alt}
                  onClick={() => {
                    setBackground?.(categoryId!!, id);
                    setCategoryId(undefined);
                  }}
                />
              </GridItem>
            ))}
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button
            marginRight="10px"
            variant="outline"
            onClick={() => {
              setBackground?.(categoryId!!, null);
              setCategoryId(undefined);
            }}
            colorScheme="red"
          >
            Remove Background
          </Button>
          <Button
            variant="outline"
            colorScheme="grey"
            mr={3}
            onClick={() => setCategoryId(undefined)}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
