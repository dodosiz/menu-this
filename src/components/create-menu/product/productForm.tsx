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
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import styles from "@/styles/components/create-menu/product/productForm.module.css";
import { FormEvent, useState } from "react";
import { Product } from "@prisma/client";
import { ProductMap } from "@/pages/api/menu/get-menu-data/[userId]";
import {
  CreateProductData,
  CreateProductResult,
  UpdateProductData,
} from "@/lib/data/products";
import { RxCross2 } from "react-icons/rx";

interface ProductFormProps {
  categoryId: string;
  productMap: ProductMap;
  editedProduct?: Product;
  setProductMap: (pm: ProductMap) => void;
  setErrorMessage: (s: string) => void;
  setEditedProductId?: (p: string) => void;
}

export function ProductForm({
  categoryId,
  productMap,
  editedProduct,
  setProductMap,
  setErrorMessage,
  setEditedProductId,
}: ProductFormProps) {
  const [price, setPrice] = useState(
    editedProduct ? editedProduct.price.toString() : ""
  );
  const [name, setName] = useState(editedProduct ? editedProduct.name : "");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );
  const [isLoading, setLoading] = useState(false);

  function scrollToBottom() {
    setTimeout(() => {
      window.scrollTo({
        top: document.documentElement.scrollHeight,
        behavior: "smooth",
      });
    }, 100);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    if (!editedProduct) {
      createProduct();
    } else {
      updateProduct(editedProduct);
    }
  }

  async function updateProduct(editedProduct: Product) {
    const data: UpdateProductData = {
      name,
      description,
      price,
      productId: editedProduct.id,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setLoading(true);
    const response = await fetch("/api/product/update", options);
    if (response.status === 200) {
      const updatedProduct: Product = {
        ...editedProduct,
        name,
        description,
        price: parseFloat(price),
      };
      const updatedProducts = productMap[categoryId].map((p) =>
        p.id === updatedProduct.id ? updatedProduct : p
      );
      setLoading(false);
      setEditedProductId?.("");
      setProductMap({
        ...productMap,
        [categoryId]: updatedProducts,
      });
    } else if (response.status === 500) {
      setLoading(false);
      setEditedProductId?.("");
      setErrorMessage("Internal server error");
    }
  }

  async function createProduct() {
    const data: CreateProductData = {
      name: name,
      description: description,
      price: price,
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
    const response = await fetch("/api/product/create", options);
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
      scrollToBottom();
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
              leftIcon={editedProduct ? <IoMdCheckmark /> : <IoMdAdd />}
              colorScheme="teal"
              variant="outline"
              isLoading={isLoading}
            >
              {editedProduct ? "Update" : "Add Product"}
            </Button>
            {editedProduct && setEditedProductId && (
              <Button
                leftIcon={<RxCross2 />}
                colorScheme="gray"
                variant="outline"
                onClick={() => setEditedProductId("")}
                marginLeft="2"
              >
                Cancel
              </Button>
            )}
          </GridItem>
        </Grid>
      </form>
    </Box>
  );
}
