import {
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AiOutlineCamera } from "react-icons/ai";
import { useState } from "react";

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
      <InputGroup>
        <InputLeftElement pointerEvents="none">
          <AiOutlineCamera />
        </InputLeftElement>
        <Input
          type="file"
          accept=".jpg,.png"
          placeholder="Choose image"
          onChange={(event) => {
            const uploadedFile = event.target.files?.[0];
            if (uploadedFile) {
              const fileSizeInKB = uploadedFile.size / 1024;
              if (fileSizeInKB < 500) {
                setShowImageSizeWarning(false);
                setSelectedImage(uploadedFile);
              } else {
                setShowImageSizeWarning(true);
              }
            }
          }}
        />
      </InputGroup>
      {showImageSizeWarning && (
        <Text color="red.500">Image size should be less than 500 KB</Text>
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
