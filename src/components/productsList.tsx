import { Box, Divider, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Product } from "@prisma/client";
import styles from "@/styles/components/productsList.module.css";

interface ProductsListProps {
  products: Product[];
}

export function ProductsList({ products }: ProductsListProps) {
  return (
    <>
      {products.map((product) => {
        return (
          <Box key={"pd-" + product.id} className={styles.product_box}>
            <Divider />
            <Grid templateColumns="repeat(5, 1fr)" gap={4}>
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
