import {
  Button,
  FormControl,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { RiEditLine } from "react-icons/ri";
import { useState, FormEvent } from "react";
import { Brand, BrandDTO } from "@/lib/data/brand";
import { User } from "firebase/auth";
import { updateBrand as dbUpdateBrand } from "@/lib/data/brand";

interface EditBrandProps {
  brand: Brand;
  user: User;
  setBrand: (_b: Brand) => void;
  setLoading: (_b: boolean) => void;
  setErrorMessage: (_e: string) => void;
}

export function EditBrand({
  brand,
  user,
  setBrand,
  setLoading,
  setErrorMessage,
}: EditBrandProps) {
  const [brandName, setBrandName] = useState(brand.title);
  const [isEditBrandModalOpen, setEditBrandModalOpen] = useState(false);
  const onClose = () => {
    setEditBrandModalOpen(false);
    setBrandName(brand.title);
  };
  async function updateBrand(e: FormEvent) {
    e.preventDefault();
    setEditBrandModalOpen(false);
    setLoading(true);
    try {
      const data: BrandDTO = {
        userId: user.uid,
        title: brandName,
      };
      await dbUpdateBrand(data);
      setLoading(false);
      setBrand({
        ...brand,
        title: brandName,
      });
    } catch {
      setLoading(false);
      setErrorMessage("Failed to update brand");
    }
  }
  return (
    <>
      <IconButton
        colorScheme="teal"
        variant="ghost"
        aria-label="Edit brand name"
        icon={<RiEditLine />}
        onClick={() => setEditBrandModalOpen(true)}
        size="md"
      />
      <Modal isOpen={isEditBrandModalOpen} onClose={() => onClose()}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Update Brand</ModalHeader>
          <ModalCloseButton />
          <form onSubmit={(e) => updateBrand(e)}>
            <ModalBody pb={6}>
              <FormControl>
                <Input
                  value={brandName}
                  onChange={(e) => setBrandName(e.target.value)}
                  variant="outline"
                  focusBorderColor="teal.200"
                  maxLength={50}
                />
              </FormControl>
            </ModalBody>

            <ModalFooter>
              <Button
                colorScheme="teal"
                variant="outline"
                mr={3}
                isDisabled={!brandName.length}
                type="submit"
              >
                Save
              </Button>
              <Button
                colorScheme="gray"
                variant="outline"
                onClick={() => onClose()}
              >
                Cancel
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  );
}
