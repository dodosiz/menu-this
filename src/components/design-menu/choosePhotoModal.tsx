import {
  Button,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { Category } from "@/lib/data/categories";
import { PhotoLibrary } from "./photoLibrary";
import { UploadImage } from "./uploadImage";

interface ChoosePhotoModalProps {
  categoryId: string | undefined;
  categories: Category[];
  setBackground?: (_categoryId: string, _background: string | null) => void;
  uploadImage?: (_categoryId: string, _file: File) => void;
  setCategoryId: (_b: string | undefined) => void;
}

export function ChoosePhotoModal({
  categoryId,
  setCategoryId,
  setBackground,
  uploadImage,
  categories,
}: ChoosePhotoModalProps) {
  const category = categories.find((c) => c.id === categoryId);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    null
  );
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedMode, setSelectedMode] = useState<"UPLOAD" | "CHOOSE" | null>(
    null
  );
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
          {selectedMode === null && (
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <OptionButton
                  onClick={() => setSelectedMode("UPLOAD")}
                  label="Upload image"
                />
              </GridItem>
              <GridItem colSpan={{ base: 2, md: 1 }}>
                <OptionButton
                  onClick={() => setSelectedMode("CHOOSE")}
                  label="Choose from gallery"
                />
              </GridItem>
            </Grid>
          )}
          {selectedMode === "UPLOAD" && (
            <UploadImage
              selectedImage={selectedImage}
              setSelectedImage={setSelectedImage}
            />
          )}
          {selectedMode === "CHOOSE" && (
            <PhotoLibrary
              selectedBackground={selectedBackground}
              setSelectedBackground={setSelectedBackground}
            />
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => {
              if (categoryId && setBackground && selectedBackground !== null) {
                setBackground(categoryId, selectedBackground);
              } else if (categoryId && uploadImage && selectedImage !== null) {
                uploadImage(categoryId, selectedImage);
              }
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

function OptionButton({
  onClick,
  label,
}: {
  onClick: () => void;
  label: string;
}) {
  return (
    <Button
      size="md"
      height={100}
      width="100%"
      border="2px"
      borderColor="teal.500"
      onClick={onClick}
    >
      {label}
    </Button>
  );
}
