import { Brand, BrandDTO } from "@/lib/data/brand";
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
    const data: BrandDTO = {
      userId: props.userId,
      title: brandName,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const response = await fetch("/api/brand/create", options);
    if (response.status === 200) {
      const result: Brand = await response.json();
      props.setBrand(result);
    } else if (response.status === 500) {
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
