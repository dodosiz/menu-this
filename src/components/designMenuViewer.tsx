import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/roboto/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/playfair-display/400.css";

import { ProductMap } from "@/pages/api/get-menu-data/[userId]";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Category, Menu } from "@prisma/client";
import styles from "@/styles/components/designMenuViewer.module.css";

interface DesignMenuViewer {
  categories: Category[];
  productMap: ProductMap;
  menu: Menu;
}

export function DesignMenuViewer({
  categories,
  productMap,
  menu,
}: DesignMenuViewer) {
  return (
    <Box className={styles.menu} backgroundColor={menu.background_color}>
      {categories
        .sort(
          (c1, c2) =>
            Date.parse(`${c1.created_at}`) - Date.parse(`${c2.created_at}`)
        )
        .map((category, i) => (
          <Box key={`cb-${category.id}`}>
            <Heading
              marginTop={i > 0 ? menu.title_margin : 0}
              color={menu.title_color}
              size={menu.title_size}
              as="h1"
              fontFamily={menu.title_font}
            >
              {category.title}
            </Heading>
            <Grid templateColumns="repeat(5, 1fr)">
              {productMap[category.id]
                .sort(
                  (p1, p2) =>
                    Date.parse(`${p2.created_at}`) -
                    Date.parse(`${p1.created_at}`)
                )
                .map((product, i) => (
                  <>
                    <GridItem
                      marginTop={
                        i > 0 ? menu.name_margin : menu.name_title_margin
                      }
                      colSpan={{ base: 3, md: 4 }}
                    >
                      <Heading
                        fontFamily={menu.content_font}
                        color={menu.name_color}
                        as="h2"
                        size={menu.name_size}
                      >
                        {product.name}
                      </Heading>
                    </GridItem>
                    <GridItem
                      marginTop={
                        i > 0 ? menu.name_margin : menu.name_title_margin
                      }
                      colSpan={{ base: 2, md: 1 }}
                    >
                      <Heading
                        display="flex"
                        fontFamily={menu.content_font}
                        justifyContent="flex-end"
                        color={menu.name_color}
                        as="h2"
                        size={menu.name_size}
                      >
                        € {product.price.toFixed(2)}
                      </Heading>
                    </GridItem>
                    <GridItem colSpan={{ base: 3, md: 4 }}>
                      <Text
                        fontFamily={menu.content_font}
                        fontSize={menu.description_size}
                        color={menu.description_color}
                      >
                        {product.description}
                      </Text>
                    </GridItem>
                    <GridItem colSpan={{ base: 2, md: 1 }}></GridItem>
                  </>
                ))}
            </Grid>
          </Box>
        ))}
    </Box>
  );
}
