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
import { useEffect, useState } from "react";
import { Category } from "@/lib/data/categories";

interface ChoosePhotoModalProps {
  categoryId: string | undefined;
  categories: Category[];
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
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    category ? category.background : null
  );
  useEffect(() => {
    setTimeout(() => {
      window.document
        .getElementById("selected")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  });
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
                  className={
                    id === selectedBackground
                      ? styles.template_image_active
                      : styles.template_image
                  }
                  id={id === selectedBackground ? "selected" : id}
                  src={BACKGROUND_IMG[id].path}
                  alt={BACKGROUND_IMG[id].alt}
                  onClick={() => {
                    if (id === selectedBackground) {
                      setSelectedBackground(null);
                    } else {
                      setSelectedBackground(id);
                    }
                  }}
                />
              </GridItem>
            ))}
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => {
              setBackground?.(categoryId!!, selectedBackground);
              setCategoryId(undefined);
            }}
            colorScheme="teal"
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
