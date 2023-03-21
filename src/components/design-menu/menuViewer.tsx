import "@fontsource/raleway/400.css";
import "@fontsource/open-sans/400.css";
import "@fontsource/montserrat/400.css";
import "@fontsource/roboto/400.css";
import "@fontsource/poppins/400.css";
import "@fontsource/playfair-display/400.css";
import "@fontsource/lato/400.css";
import "@fontsource/handlee/400.css";
import "@fontsource/gloria-hallelujah/400.css";
import "@fontsource/beth-ellen/400.css";

import { Fragment, useState } from "react";
import {
  Box,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Text,
} from "@chakra-ui/react";
import styles from "@/styles/components/design-menu/designMenuViewer.module.css";
import { getImageData, templateToMenu } from "@/lib/data/template-data";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ChoosePhotoModal } from "./choosePhotoModal";
import { Brand } from "@/lib/data/brand";
import { Menu } from "@/lib/data/menu";
import { Category } from "@/lib/data/categories";
import { Product } from "@/lib/data/products";

interface DesignMenuViewer {
  categories: Category[];
  setBackground?: (_categoryId: string, _background: string | null) => void;
  products: Product[];
  menu: Menu;
  inEdit?: boolean;
  brand: Brand;
}

export function MenuViewer({
  categories,
  products,
  menu,
  inEdit,
  brand,
  setBackground,
}: DesignMenuViewer) {
  const {
    backgroundColor,
    contentFont,
    descriptionColor,
    descriptionSize,
    nameColor,
    nameMargin,
    nameSize,
    nameTitleMargin,
    brandColor,
    brandMargin,
    brandSize,
    brandFont,
    titleColor,
    titleFont,
    titleMargin,
    titleSize,
  } = menu.template ? { ...templateToMenu[menu.template], ...menu } : menu;
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  return (
    <Container
      paddingLeft={0}
      paddingRight={0}
      className={styles.menu}
      backgroundColor={backgroundColor}
    >
      <Center>
        <Heading
          color={brandColor}
          size={brandSize}
          as="h1"
          fontFamily={brandFont}
          marginTop={brandMargin}
        >
          {brand.title}
        </Heading>
      </Center>
      {categories
        .sort((c1, c2) => c1.createdAt - c2.createdAt)
        .map((category) => (
          <>
            {category.background && (
              <Image
                marginTop={titleMargin}
                position="relative"
                marginBottom={nameMargin}
                width="100vw"
                src={getImageData(category.background).path}
                alt={getImageData(category.background).alt}
              />
            )}
            <Box
              paddingLeft="20px"
              paddingRight="20px"
              key={`cb-${category.id}`}
            >
              <Heading
                marginTop={!category.background ? titleMargin : 0}
                color={titleColor}
                size={titleSize}
                as="h1"
                fontFamily={titleFont}
              >
                {category.title}
                {inEdit && (
                  <IconButton
                    icon={<HiOutlinePhotograph />}
                    color={titleColor}
                    aria-label="design"
                    variant="outline"
                    size="md"
                    onClick={() => setCategoryId(category.id)}
                    _hover={{ background: titleColor, color: backgroundColor }}
                    borderRadius="50%"
                    float="right"
                  />
                )}
              </Heading>
              <Grid templateColumns="repeat(5, 1fr)">
                {products
                  .filter((p) => p.categoryId === category.id)
                  .map((product, i) => (
                    <Fragment key={`gi-${product.id}`}>
                      <GridItem
                        marginTop={i > 0 ? nameMargin : nameTitleMargin}
                        colSpan={{ base: 3, md: 4 }}
                      >
                        <Heading
                          fontFamily={contentFont}
                          color={nameColor}
                          as="h2"
                          size={nameSize}
                        >
                          {product.name}
                        </Heading>
                      </GridItem>
                      <GridItem
                        marginTop={i > 0 ? nameMargin : nameTitleMargin}
                        colSpan={{ base: 2, md: 1 }}
                      >
                        <Heading
                          display="flex"
                          fontFamily={contentFont}
                          justifyContent="flex-end"
                          color={nameColor}
                          as="h2"
                          size={nameSize}
                        >
                          € {product.price.toFixed(2)}
                        </Heading>
                      </GridItem>
                      <GridItem colSpan={{ base: 3, md: 4 }}>
                        <Text
                          fontFamily={contentFont}
                          fontSize={descriptionSize}
                          color={descriptionColor}
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
