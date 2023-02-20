import { Box, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import styles from "@/styles/components/productsList.module.css";
import { DeleteIconWithConfirm } from "./deleteIconWithConfirm";
import { useState } from "react";
import { LoadingPage } from "./loadingPage";

interface ProductsListProps {
  products: Product[];
  setProducts: (p: Product[]) => void;
  setErrorMessage: (s: string) => void;
}

export function ProductsList({
  products,
  setProducts,
  setErrorMessage,
}: ProductsListProps) {
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);

  async function handleDelete(productId: string) {
    const JSONdata = JSON.stringify({ id: productId });
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setLoading(true);
    setToDelete(null);
    const response = await fetch("/api/delete-product", options);
    if (response.status === 200) {
      setLoading(false);
      setProducts(products.filter((p) => p.id !== productId));
    } else if (response.status === 500) {
      setLoading(false);
      setErrorMessage("Internal server error");
    }
  }

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading &&
        products.map((product) => {
          return (
            <Box key={"pd-" + product.id} className={styles.product_box}>
              <Divider />
              <Grid templateColumns="repeat(6, 1fr)" gap={4}>
                <GridItem colSpan={{ base: 3, md: 4 }}>
                  <Heading size="md" as="h3" className={styles.product_heading}>
                    {product.name}
                  </Heading>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}>
                  <Heading size="md" as="h3" className={styles.product_heading}>
                    € {product.price.toFixed(2)}
                  </Heading>
                </GridItem>
                <GridItem colSpan={{ base: 1, md: 1 }}>
                  <DeleteIconWithConfirm
                    className={styles.delete_icon}
                    confirmMessage={`Are you sure you want to delete the product "${product.name}"?`}
                    isConfirmOpen={product.id === toDelete}
                    onOpenConfirm={() => setToDelete(product.id)}
                    onCloseConfirm={() => setToDelete(null)}
                    onDeleteConfirmed={() => handleDelete(product.id)}
                    title="Delete Product"
                  />
                </GridItem>
                <GridItem colSpan={{ base: 3, md: 4 }}>
                  <Text fontSize="md" className={styles.product_text}>
                    {product.description}
                  </Text>
                </GridItem>
              </Grid>
            </Box>
          );
        })}
    </>
  );
}
