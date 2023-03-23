import {
  Box,
  Button,
  Grid,
  GridItem,
  IconButton,
  Input,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  Textarea,
  Tooltip,
} from "@chakra-ui/react";
import { IoMdAdd, IoMdCheckmark, IoMdRemove } from "react-icons/io";
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
import {
  createProduct as dbCreateProduct,
  updateProduct as dbUpdateProduct,
} from "@/lib/data/products";

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
  const [secondPrice, setSecondPrice] = useState(
    editedProduct && editedProduct.secondPrice
      ? editedProduct.secondPrice.toString()
      : ""
  );
  const [name, setName] = useState(editedProduct ? editedProduct.name : "");
  const [description, setDescription] = useState(
    editedProduct ? editedProduct.description : ""
  );
  const [isLoading, setLoading] = useState(false);
  const [showSecondPrice, setShowSecondPrice] = useState(
    !!editedProduct && !!editedProduct.secondPrice
  );

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
    setLoading(true);
    try {
      const data: UpdateProductData = {
        name,
        description,
        price,
        secondPrice,
        productId: editedProduct.id,
        userId,
      };
      const result = await dbUpdateProduct(data);
      mergeProduct(result);
      setLoading(false);
      setEditedProductId?.("");
    } catch {
      setLoading(false);
      setEditedProductId?.("");
      setErrorMessage("Failed to update product");
    }
  }

  async function createProduct() {
    setPrice("");
    setSecondPrice("");
    setName("");
    setDescription("");
    setLoading(true);
    try {
      const data: CreateProductData = {
        name: name,
        description: description,
        price: price,
        secondPrice: secondPrice,
        categoryId: categoryId,
        userId: userId,
      };
      const result = await dbCreateProduct(data);
      addProduct(result);
      setLoading(false);
      scrollToBottom();
    } catch {
      setLoading(false);
      setErrorMessage("Failed to create product");
    }
  }

  return (
    <Box className={styles.new_product}>
      <form onSubmit={handleSubmit}>
        <Grid templateColumns="repeat(10, 1fr)" gap={4}>
          <GridItem colSpan={{ base: 10, sm: 10, md: 8 }}>
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
          <GridItem colSpan={{ base: 8, sm: 8, md: 1 }}>
            <NumberInput
              name="price"
              focusBorderColor="teal.200"
              onChange={(p) => setPrice(p.replace(",", "."))}
              min={0}
              precision={2}
              display="inline"
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
          <GridItem colSpan={{ base: 2, sm: 2, md: 1 }}>
            {!showSecondPrice && (
              <IconButton
                colorScheme="teal"
                variant="ghost"
                aria-label="Add second price"
                icon={<IoMdAdd />}
                onClick={() => setShowSecondPrice(true)}
                size="md"
              />
            )}
          </GridItem>
          <GridItem colSpan={{ base: 10, sm: 10, md: 8 }}>
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
          <GridItem colSpan={{ base: 8, sm: 8, md: 1 }}>
            {showSecondPrice && (
              <NumberInput
                name="second_price"
                focusBorderColor="teal.200"
                onChange={(p) => setSecondPrice(p.replace(",", "."))}
                min={0}
                precision={2}
                isValidCharacter={(v) => /^[Ee0-9+\-.,]$/.test(v)}
                step={0.1}
                value={secondPrice}
              >
                <NumberInputField placeholder="€ 0.00" />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            )}
          </GridItem>
          <GridItem colSpan={{ base: 2, sm: 2, md: 1 }}>
            {showSecondPrice && (
              <IconButton
                colorScheme="red"
                variant="ghost"
                aria-label="Remove second price"
                icon={<IoMdRemove />}
                onClick={() => {
                  setShowSecondPrice(false);
                  setSecondPrice("");
                }}
                size="md"
              />
            )}
          </GridItem>
          <GridItem colSpan={{ base: 10, sm: 10, md: 8 }} />
          <GridItem colSpan={{ base: 10, sm: 10, md: 2 }}>
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
                leftIcon={editedProduct ? <IoMdCheckmark /> : undefined}
                colorScheme="teal"
                variant="outline"
                isLoading={isLoading}
              >
                {editedProduct ? "Update" : "Create Product"}
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
