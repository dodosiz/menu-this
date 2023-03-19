import { Box, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import styles from "@/styles/components/create-menu/product/productsList.module.css";
import { useState } from "react";
import { ContextMenu } from "../contextMenu";
import { ProductForm } from "./productForm";
import { ProductMap } from "@/pages/api/menu/get-menu-data/[userId]";
import { DeleteData, Product, SwapData } from "@/lib/data/products";

interface ProductsListProps {
  categoryId: string;
  products: Product[];
  productMap: ProductMap;
  userId: string;
  setProductMap: (pm: ProductMap) => void;
  setErrorMessage: (s: string) => void;
}

export function ProductsList({
  products,
  productMap,
  categoryId,
  userId,
  setProductMap,
  setErrorMessage,
}: ProductsListProps) {
  const [productIdToDelete, setProductIdToDelete] = useState<string | null>(
    null
  );
  const [editedProductId, setEditedProductId] = useState("");

  async function handleDelete(productId: string) {
    const data: DeleteData = {
      categoryId,
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
      const newProducts = products.filter((p) => p.id !== productId);
      setProductMap({ ...productMap, [categoryId]: newProducts });
    } else if (response.status === 500) {
      setErrorMessage("Failed to delete product");
    }
  }

  async function swapDates(id1: string, id2: string) {
    const data: SwapData = {
      id1,
      id2,
      userId,
      categoryId,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    const p1 = products.find((p) => p.id === id1);
    const p2 = products.find((p) => p.id === id2);
    setProductMap({
      ...productMap,
      [categoryId]: products.map((p) => {
        if (p.id === id1 && p2 && p1) {
          return {
            ...p1,
            createdAt: p2?.createdAt,
          };
        } else if (p.id === id2 && p2 && p1) {
          return {
            ...p2,
            createdAt: p1?.createdAt,
          };
        }
        return p;
      }),
    });
    const response = await fetch("/api/product/swap", options);
    if (response.status === 500) {
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
                  productMap={productMap}
                  setErrorMessage={setErrorMessage}
                  setProductMap={setProductMap}
                  editedProduct={product}
                  userId={userId}
                  setEditedProductId={setEditedProductId}
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
