import { Brand, BrandDTO, createBrand } from "@/lib/data/brand";
import {
  Button,
  Center,
  Heading,
  HStack,
  Input,
  VStack,
} from "@chakra-ui/react";
import { FormEvent, useState } from "react";

interface CreateBrandProps {
  userId: string;
  setErrorMessage: (_e: string) => void;
  setBrand: (_b: Brand) => void;
}

export function CreateBrand(props: CreateBrandProps) {
  const [brandName, setBrandName] = useState("");
  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    try {
      const data: BrandDTO = {
        userId: props.userId,
        title: brandName,
      };
      const result = await createBrand(data);
      props.setBrand(result);
    } catch {
      props.setErrorMessage("Failed to create brand");
    }
  }
  return (
    <Center>
      <form onSubmit={handleSubmit}>
        <VStack
          alignItems="flex-start"
          justifyContent="center"
          height="60vh"
          minHeight="60vh"
          spacing="10px"
        >
          <Heading size="xl" as="h1">
            How is your brand called?
          </Heading>
          <HStack spacing="10px">
            <Input
              value={brandName}
              maxLength={50}
              placeholder="Name of your brand"
              focusBorderColor="teal.200"
              onChange={(e) => setBrandName(e.target.value)}
            />
            <Button
              isDisabled={!brandName.length}
              type="submit"
              colorScheme="teal"
              variant="outline"
            >
              Create
            </Button>
          </HStack>
        </VStack>
      </form>
    </Center>
  );
}
