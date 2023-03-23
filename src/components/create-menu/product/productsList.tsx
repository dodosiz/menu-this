import { Box, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/components/create-menu/product/productsList.module.css";
import { useState } from "react";
import { ContextMenu } from "../contextMenu";
import { ProductForm } from "./productForm";
import {
  DeleteData,
  deleteProduct,
  Product,
  swap,
  SwapData,
  SwapResult,
  UpdateProductResult,
} from "@/lib/data/products";
import { TextWithLineBreaks } from "@/components/commons/textWithLineBreaks";

interface ProductsListProps {
  categoryId: string;
  products: Product[];
  userId: string;
  setErrorMessage: (_s: string) => void;
  addProduct: (_p: Product) => void;
  mergeProduct: (_p: UpdateProductResult) => void;
  removeProduct: (_id: string) => void;
  swapProducts: (_r: SwapResult) => void;
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
    setProductIdToDelete(null);
    try {
      const data: DeleteData = {
        userId,
        productId,
      };
      await deleteProduct(data);
      removeProduct(productId);
    } catch {
      setErrorMessage("Failed to delete product");
    }
  }

  async function swapDates(id1: string, id2: string) {
    try {
      const data: SwapData = {
        id1,
        id2,
        userId,
      };
      const result = await swap(data);
      if (result) {
        swapProducts(result);
      }
    } catch {
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
                      <TextWithLineBreaks text={product.description} />
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
