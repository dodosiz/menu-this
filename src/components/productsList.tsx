import { Box, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import styles from "@/styles/components/productsList.module.css";
import { useState } from "react";
import { LoadingPage } from "./loadingPage";
import { ContextMenu } from "./contextMenu";
import { ProductForm } from "./productForm";
import { ProductMap } from "@/pages/api/get-menu-data/[userId]";

interface ProductsListProps {
  categoryId: string;
  products: Product[];
  productMap: ProductMap;
  setProductMap: (pm: ProductMap) => void;
  setErrorMessage: (s: string) => void;
}

export function ProductsList({
  products,
  productMap,
  categoryId,
  setProductMap,
  setErrorMessage,
}: ProductsListProps) {
  const [toDelete, setToDelete] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [editedProductId, setEditedProductId] = useState("");

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
      const newProducts = products.filter((p) => p.id !== productId);
      setProductMap({ ...productMap, [categoryId]: newProducts });
    } else if (response.status === 500) {
      setLoading(false);
      setErrorMessage("Internal server error");
    }
  }

  return (
    <>
      {isLoading && <LoadingPage />}
      {!isLoading &&
        products
          .sort(
            (p1, p2) =>
              Date.parse(`${p2.created_at}`) - Date.parse(`${p1.created_at}`)
          )
          .map((product) => {
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
                        isConfirmOpen={product.id === toDelete}
                        editDisabled={false}
                        confirmTitle="Delete Product"
                        onCloseConfirm={() => setToDelete(null)}
                        onDeleteConfirmed={() => handleDelete(product.id)}
                        onOpenConfirm={() => setToDelete(product.id)}
                        onEditClick={() => setEditedProductId(product.id)}
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
