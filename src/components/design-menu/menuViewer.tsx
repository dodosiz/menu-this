import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/roboto/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/playfair-display/400.css";

import { Fragment, useState } from "react";
import {
  Box,
  Container,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import { Menu } from "@prisma/client";
import styles from "@/styles/components/design-menu/designMenuViewer.module.css";
import { BACKGROUND_IMG, templateToMenu } from "@/lib/data/template-data";
import { CategoryView, ProductMapView } from "@/lib/data/menu-view";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ChoosePhotoModal } from "./choosePhotoModal";

interface DesignMenuViewer {
  categories: CategoryView[];
  setBackground?: (categoryId: string, background: string | null) => void;
  productMap: ProductMapView;
  menu: Menu;
  inEdit?: boolean;
}

export function MenuViewer({
  categories,
  productMap,
  menu,
  inEdit,
  setBackground,
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
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  return (
    <Container
      paddingLeft={0}
      paddingRight={0}
      className={styles.menu}
      backgroundColor={background_color}
    >
      {categories.map((category, i) => (
        <>
          {category.background && (
            <Image
              marginTop={i > 0 ? title_margin : 0}
              position="relative"
              width="100vw"
              src={BACKGROUND_IMG[category.background].path}
              alt={BACKGROUND_IMG[category.background].alt}
            />
          )}
          <Box paddingLeft="20px" paddingRight="20px" key={`cb-${category.id}`}>
            <Heading
              marginTop={i > 0 && !category.background ? title_margin : 0}
              color={title_color}
              size={title_size}
              as="h1"
              fontFamily={title_font}
            >
              {category.title}
              {inEdit && (
                <IconButton
                  icon={<HiOutlinePhotograph />}
                  color={title_color}
                  aria-label="design"
                  variant="outline"
                  size="md"
                  onClick={() => setCategoryId(category.id)}
                  _hover={{ background: title_color, color: background_color }}
                  borderRadius="50%"
                  float="right"
                />
              )}
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
        </>
      ))}
      {categoryId !== undefined && (
        <ChoosePhotoModal
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          setBackground={setBackground}
        />
      )}
    </Container>
  );
}
