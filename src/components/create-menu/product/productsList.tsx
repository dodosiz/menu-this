import { Box, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/components/create-menu/product/productsList.module.css";
import { useState } from "react";
import { ContextMenu } from "../contextMenu";
import { ProductForm } from "./productForm";
import {
  DeleteData,
  Product,
  SwapData,
  SwapResult,
  UpdateProductResult,
} from "@/lib/data/products";

interface ProductsListProps {
  categoryId: string;
  products: Product[];
  userId: string;
  setErrorMessage: (s: string) => void;
  addProduct: (p: Product) => void;
  mergeProduct: (p: UpdateProductResult) => void;
  removeProduct: (id: string) => void;
  swapProducts: (r: SwapResult) => void;
}

export function ProductsList({
  products,
  categoryId,
  userId,
  setErrorMessage,
  addProduct,
  mergeProduct,
  removeProduct,
  swapProducts,
}: ProductsListProps) {
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [editedProductId, setEditedProductId] = useState("");

  async function handleDelete(productId: string) {
    const data: DeleteData = {
      userId,
      productId,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setProductIdToDelete(null);
    const response = await fetch("/api/product/delete", options);
    if (response.status === 200) {
      removeProduct(productId);
    } else if (response.status === 500) {
      setErrorMessage("Failed to delete product");
    }
  }

  async function swapDates(id1: string, id2: string) {
    const data: SwapData = {
      id1,
      id2,
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
    const response = await fetch("/api/product/swap", options);
    if (response.status === 200) {
      const result: SwapResult = await response.json();
      swapProducts(result);
    } else if (response.status === 500) {
      setErrorMessage("Failed to update the product order");
    }
  }

  return (
    <>
      {products
        .sort((p1, p2) => p1.createdAt - p2.createdAt)
        .map((product, index) => {
          return (
            <Box key={"pd-" + product.id} className={styles.product_box}>
              <Divider />
              {editedProductId === product.id && (
                <ProductForm
                  categoryId={categoryId}
                  setErrorMessage={setErrorMessage}
                  products={products}
                  editedProduct={product}
                  userId={userId}
                  setEditedProductId={setEditedProductId}
                  addProduct={addProduct}
                  mergeProduct={mergeProduct}
                />
              )}
              {editedProductId !== product.id && (
                <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                  <GridItem colSpan={{ base: 3, md: 4 }}>
                    <Heading
                      size="md"
                      as="h3"
                      className={styles.product_heading}
                    >
                      {product.name}
                    </Heading>
                  </GridItem>
                  <GridItem colSpan={{ base: 2, md: 1 }}>
                    <Heading
                      size="md"
                      as="h3"
                      className={styles.product_heading}
                    >
                      € {product.price.toFixed(2)}
                    </Heading>
                  </GridItem>
                  <GridItem colSpan={{ base: 1, md: 1 }}>
                    <ContextMenu
                      confirmMessage={`Are you sure you want to delete the product "${product.name}"?`}
                      isConfirmOpen={product.id === productIdToDelete}
                      confirmTitle="Delete Product"
                      onCloseConfirm={() => setProductIdToDelete(null)}
                      onDeleteConfirmed={() => handleDelete(product.id)}
                      onOpenConfirm={() => setProductIdToDelete(product.id)}
                      onEditClick={() => setEditedProductId(product.id)}
                      onMoveUp={
                        products[index - 1]
                          ? () => swapDates(product.id, products[index - 1].id)
                          : undefined
                      }
                      onMoveDown={
                        products[index + 1]
                          ? () => swapDates(product.id, products[index + 1].id)
                          : undefined
                      }
                    />
                  </GridItem>
                  <GridItem colSpan={{ base: 3, md: 4 }}>
                    <Text fontSize="md" className={styles.product_text}>
                      {product.description}
                    </Text>
                  </GridItem>
                </Grid>
              )}
            </Box>
          );
        })}
    </>
  );
}
