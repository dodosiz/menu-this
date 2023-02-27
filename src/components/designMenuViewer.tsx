import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/roboto/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/playfair-display/400.css";

import { Fragment } from "react";
import { Box, Grid, GridItem, Heading, Text } from "@chakra-ui/react";
import { Menu } from "@prisma/client";
import styles from "@/styles/components/designMenuViewer.module.css";
import { templateToMenu } from "@/lib/template-data";
import { CategoryView, ProductMapView } from "@/lib/menu-view";

interface DesignMenuViewer {
  categories: CategoryView[];
  productMap: ProductMapView;
  menu: Menu;
}

export function DesignMenuViewer({
  categories,
  productMap,
  menu,
}: DesignMenuViewer) {
  const {
    background_color,
    content_font,
    description_color,
    description_size,
    name_color,
    name_margin,
    name_size,
    name_title_margin,
    title_color,
    title_font,
    title_margin,
    title_size,
  } = menu.template ? { ...templateToMenu[menu.template], ...menu } : menu;
  return (
    <Box className={styles.menu} backgroundColor={background_color}>
      {categories.map((category, i) => (
        <Box key={`cb-${category.id}`}>
          <Heading
            marginTop={i > 0 ? title_margin : 0}
            color={title_color}
            size={title_size}
            as="h1"
            fontFamily={title_font}
          >
            {category.title}
          </Heading>
          <Grid templateColumns="repeat(5, 1fr)">
            {productMap[category.id].map((product, i) => (
              <Fragment key={`gi-${product.id}`}>
                <GridItem
                  marginTop={i > 0 ? name_margin : name_title_margin}
                  colSpan={{ base: 3, md: 4 }}
                >
                  <Heading
                    fontFamily={content_font}
                    color={name_color}
                    as="h2"
                    size={name_size}
                  >
                    {product.name}
                  </Heading>
                </GridItem>
                <GridItem
                  marginTop={i > 0 ? name_margin : name_title_margin}
                  colSpan={{ base: 2, md: 1 }}
                >
                  <Heading
                    display="flex"
                    fontFamily={content_font}
                    justifyContent="flex-end"
                    color={name_color}
                    as="h2"
                    size={name_size}
                  >
                    € {product.price.toFixed(2)}
                  </Heading>
                </GridItem>
                <GridItem colSpan={{ base: 3, md: 4 }}>
                  <Text
                    fontFamily={content_font}
                    fontSize={description_size}
                    color={description_color}
                  >
                    {product.description}
                  </Text>
                </GridItem>
                <GridItem colSpan={{ base: 2, md: 1 }}></GridItem>
              </Fragment>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
