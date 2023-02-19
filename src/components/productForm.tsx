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
import { ProductMap } from "@/pages/createMenu";
import { Product } from "@prisma/client";

interface ProductFormProps {
  categoryId: string;
  productMap: ProductMap;
  setProductMap: (pm: ProductMap) => void;
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
}: ProductFormProps) {
  const [price, setPrice] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

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
    const response = await fetch("/api/create-product", options);
    const id = await response.json();
    const newProduct: Product = {
      id,
      categoryId,
      description: data.description,
      name: data.name,
      price: parseFloat(data.price),
    };
    if (response.status === 200) {
      setProductMap({
        ...productMap,
        [categoryId]: [...productMap[categoryId], newProduct],
      });
    }
  }

  return (
    <Box className={styles.new_product}>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(5, 1fr)" gap={4}>
          <GridItem colSpan={{ sm: 5, md: 4 }}>
            <Input
              name="name"
              required={true}
              value={name}
              placeholder="Product name"
              focusBorderColor="teal.200"
              onChange={(e) => setName(e.target.value)}
            />
          </GridItem>
          <GridItem colSpan={{ sm: 5, md: 1 }}>
            <NumberInput
              name="price"
              focusBorderColor="teal.200"
              onChange={(p) => setPrice(p)}
              min={0}
              precision={2}
              step={0.1}
              value={price}
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </GridItem>
          <GridItem colSpan={{ sm: 5, md: 4 }}>
            <Textarea
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Write the product description here..."
              focusBorderColor="teal.200"
              resize="vertical"
            />
          </GridItem>
          <GridItem colSpan={{ sm: 5, md: 1 }}>
            <Button
              isDisabled={!name.length || !price.length}
              type="submit"
              leftIcon={<IoMdAdd />}
              colorScheme="teal"
              variant="outline"
            >
              Add Product
            </Button>
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}
