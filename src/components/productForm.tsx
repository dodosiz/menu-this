import {
  Box,
  Button,
  Grid,
  GridItem,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
} from "@chakra-ui/react";
import { IoMdAdd } from "react-icons/io";
import styles from "@/styles/components/productForm.module.css";
import { FormEvent, useState } from "react";
import { Product } from "@prisma/client";
import { ProductMap } from "@/pages/api/get-menu-data/[userId]";
import { CreateProductResult } from "@/lib/products";

interface ProductFormProps {
  categoryId: string;
  productMap: ProductMap;
  setProductMap: (pm: ProductMap) => void;
  setErrorMessage: (s: string) => void;
}

export interface ProductData {
  name: string;
  price: string;
  description: string;
  categoryId: string;
}

export function ProductForm({
  categoryId,
  productMap,
  setProductMap,
  setErrorMessage,
}: ProductFormProps) {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    const data: ProductData = {
      name: (event.target as any).name.value,
      description: (event.target as any).description.value,
      price: (event.target as any).price.value,
      categoryId: categoryId,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setPrice("");
    setName("");
    setDescription("");
    setLoading(true);
    const response = await fetch("/api/create-product", options);
    if (response.status === 200) {
      const result = (await response.json()) as CreateProductResult;
      const newProduct: Product = {
        id: result.id,
        categoryId,
        description: data.description,
        name: data.name,
        price: parseFloat(data.price),
        created_at: result.created_at,
      };
      setLoading(false);
      setProductMap({
        ...productMap,
        [categoryId]: [...productMap[categoryId], newProduct],
      });
    } else if (response.status === 500) {
      setLoading(false);
      setErrorMessage("Internal server error");
    }
  }

  return (
    <Box className={styles.new_product}>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 5, sm: 5, md: 4 }}>
            <Input
              name="name"
              required={true}
              value={name}
              placeholder="Product name"
              focusBorderColor="teal.200"
              onChange={(e) => setName(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 1 }}>
            <NumberInput
              name="price"
              focusBorderColor="teal.200"
              onChange={(p) => setPrice(p.replace(",", "."))}
              min={0}
              precision={2}
              isValidCharacter={(v) => /^[Ee0-9+\-.,]$/.test(v)}
              step={0.1}
              value={price}
            >
              <NumberInputField placeholder="€ 0.00" />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 4 }}>
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write the product description here..."
              focusBorderColor="teal.200"
              resize="vertical"
            />
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 1 }}>
            <Button
              isDisabled={!name.length || !price.length}
              type="submit"
              leftIcon={<IoMdAdd />}
              colorScheme="teal"
              variant="outline"
              isLoading={isLoading}
            >
              Add Product
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}
