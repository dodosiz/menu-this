import { IconButton, Image, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { RxCross2 } from "react-icons/rx";
import FileInput from "../commons/fileInput";

interface UploadImageProps {
  selectedImage: File | null;
  setSelectedImage: (_i: File | null) => void;
}

export function UploadImage({
  selectedImage,
  setSelectedImage,
}: UploadImageProps) {
  const [showImageSizeWarning, setShowImageSizeWarning] = useState(false);
  return (
    <VStack alignItems="baseline">
      {!selectedImage && (
        <FileInput
          onChange={(event) => {
            const uploadedFile = event.target.files?.[0];
            if (uploadedFile) {
              const fileSizeInMB = uploadedFile.size / (1024 * 1024);
              if (fileSizeInMB < 4) {
                setShowImageSizeWarning(false);
                setSelectedImage(uploadedFile);
              } else {
                setShowImageSizeWarning(true);
              }
            }
          }}
        />
      )}
      {showImageSizeWarning && (
        <Text color="red.500">Image size should be less than 4 MB</Text>
      )}
      {selectedImage && (
        <IconButton
          aria-label="remove"
          icon={<RxCross2 />}
          variant="outline"
          colorScheme="gray"
          onClick={() => setSelectedImage(null)}
          size="sm"
        />
      )}
      {selectedImage && (
        <Image
          src={URL.createObjectURL(selectedImage)}
          maxHeight={200}
          alt={"Uploaded image"}
        />
      )}
    </VStack>
  );
}
