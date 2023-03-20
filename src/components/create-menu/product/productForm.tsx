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
  Tooltip,
} from "@chakra-ui/react";
import { IoMdAdd, IoMdCheckmark } from "react-icons/io";
import styles from "@/styles/components/create-menu/product/productForm.module.css";
import { FormEvent, useState } from "react";
import {
  CreateProductData,
  Product,
  UpdateProductData,
  UpdateProductResult,
} from "@/lib/data/products";
import { RxCross2 } from "react-icons/rx";
import { PRODUCT_LIMIT } from "@/constants";

interface ProductFormProps {
  categoryId: string;
  products: Product[];
  editedProduct?: Product;
  userId: string;
  setErrorMessage: (_s: string) => void;
  setEditedProductId?: (_p: string) => void;
  addProduct: (_p: Product) => void;
  mergeProduct: (_p: UpdateProductResult) => void;
}

export function ProductForm({
  categoryId,
  products,
  editedProduct,
  userId,
  setErrorMessage,
  setEditedProductId,
  addProduct,
  mergeProduct,
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
      userId,
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
      const result: UpdateProductResult = await response.json();
      mergeProduct(result);
      setLoading(false);
      setEditedProductId?.("");
    } else if (response.status === 500) {
      setLoading(false);
      setEditedProductId?.("");
      setErrorMessage("Failed to update product");
    }
  }

  async function createProduct() {
    const data: CreateProductData = {
      name: name,
      description: description,
      price: price,
      categoryId: categoryId,
      userId: userId,
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
      const result: Product = await response.json();
      addProduct(result);
      setLoading(false);
      scrollToBottom();
    } else if (response.status === 500) {
      setLoading(false);
      setErrorMessage("Failed to create product");
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
              maxLength={100}
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
              maxLength={250}
            />
          </GridItem>
          <GridItem colSpan={{ base: 5, sm: 5, md: 1 }}>
            <Tooltip
              label={
                products.length >= PRODUCT_LIMIT
                  ? `Maximum limit of ${PRODUCT_LIMIT} products reached`
                  : undefined
              }
            >
              <Button
                isDisabled={
                  !name.length ||
                  !price.length ||
                  (!editedProduct && products.length >= PRODUCT_LIMIT)
                }
                type="submit"
                leftIcon={editedProduct ? <IoMdCheckmark /> : <IoMdAdd />}
                colorScheme="teal"
                variant="outline"
                isLoading={isLoading}
              >
                {editedProduct ? "Update" : "Add Product"}
              </Button>
            </Tooltip>
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
