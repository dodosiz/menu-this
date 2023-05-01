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
  BoxProps,
  Center,
  Container,
  Grid,
  GridItem,
  Heading,
  IconButton,
  Image,
  Link,
  ResponsiveValue,
  Text,
} from "@chakra-ui/react";
import styles from "@/styles/components/design-menu/designMenuViewer.module.css";
import { getImageData, templateToMenu } from "@/lib/data/template-data";
import { HiOutlinePhotograph } from "react-icons/hi";
import { ChoosePhotoModal } from "./choosePhotoModal";
import { Brand } from "@/lib/data/brand";
import { Menu, Variant } from "@/lib/data/menu";
import { Category } from "@/lib/data/categories";
import { Product } from "@/lib/data/products";
import { TextWithLineBreaks } from "../commons/textWithLineBreaks";
import { displayProductPrice } from "../utils";

interface DesignMenuViewer {
  categories: Category[];
  setBackground?: (_categoryId: string, _background: string | null) => void;
  uploadImage?: (_categoryId: string, _file: File) => void;
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
  uploadImage,
}: DesignMenuViewer) {
  const {
    backgroundColor,
    contentFont,
    descriptionColor,
    brandMargin,
    brandFont,
    titleMargin,
    categoryVariant,
  } = menu.template ? { ...templateToMenu[menu.template], ...menu } : menu;
  const [categoryId, setCategoryId] = useState<string | undefined>(undefined);
  function getVariantStyle(
    variant: Variant,
    color: string,
    backgroundColor: string
  ): Partial<BoxProps> {
    if (variant === "bordered") {
      return {
        border: `1px solid ${color}`,
        color,
      };
    } else if (variant === "underlined") {
      return {
        borderBottom: `1px solid ${color}`,
        color,
      };
    } else if (variant === "inverse") {
      return {
        color: backgroundColor,
        backgroundColor: color,
      };
    }
    return { color };
  }
  function getProductLeftColumnWidth(
    product: Product
  ): ResponsiveValue<number | "auto"> {
    return product.secondPrice ? { base: 4, md: 2 } : { base: 7, md: 3 };
  }
  function getProductRightColumnWidth(
    product: Product
  ): ResponsiveValue<number | "auto"> {
    return product.secondPrice ? { base: 5, md: 2 } : { base: 2, md: 1 };
  }
  function getGapColumnWidth(): ResponsiveValue<number | "auto"> {
    return { base: 0, md: 1 };
  }
  return (
    <>
      {!inEdit && (
        <Center>
          <div>
            Powered by{" "}
            <span className="logo">
              <Link href="https://www.deinlog.com/">DEINLOG</Link>
            </span>
          </div>
        </Center>
      )}
      <Container
        maxW="container.sm"
        paddingLeft={0}
        paddingRight={0}
        className={styles.menu}
        backgroundColor={backgroundColor}
      >
        <Center paddingLeft="15px" paddingRight="15px">
          <Heading
            color={descriptionColor}
            size="2xl"
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
                  marginBottom={5}
                  width="100vw"
                  src={getImageData(category.background).path}
                  alt={getImageData(category.background).alt}
                />
              )}
              <Box
                key={`cb-${category.id}`}
                paddingLeft="10px"
                paddingRight="10px"
              >
                <Heading
                  marginTop={!category.background ? titleMargin : 0}
                  size="md"
                  as="h1"
                  fontFamily={contentFont}
                  paddingTop="18px"
                  paddingBottom="18px"
                  paddingLeft="5px"
                  paddingRight="5px"
                  {...getVariantStyle(
                    categoryVariant,
                    descriptionColor,
                    backgroundColor
                  )}
                >
                  {category.title}
                  {inEdit && (
                    <IconButton
                      icon={<HiOutlinePhotograph />}
                      color={
                        categoryVariant === "inverse"
                          ? backgroundColor
                          : descriptionColor
                      }
                      aria-label="design"
                      variant="outline"
                      size="md"
                      onClick={() => setCategoryId(category.id)}
                      _hover={{
                        background:
                          categoryVariant === "inverse"
                            ? backgroundColor
                            : descriptionColor,
                        color:
                          categoryVariant === "inverse"
                            ? descriptionColor
                            : backgroundColor,
                      }}
                      borderRadius="50%"
                      float="right"
                    />
                  )}
                </Heading>
                <Grid
                  templateColumns="repeat(10, 1fr)"
                  paddingLeft="5px"
                  paddingRight="5px"
                  color={descriptionColor}
                >
                  {products
                    .filter((p) => p.categoryId === category.id)
                    .map((product) => (
                      <Fragment key={`gi-${product.id}`}>
                        <GridItem
                          marginTop={5}
                          colSpan={getProductLeftColumnWidth(product)}
                        >
                          <Heading fontFamily={contentFont} as="h2" size="xs">
                            {product.name}
                          </Heading>
                          {product.description &&
                            product.description.length > 0 && (
                              <Text
                                fontFamily={contentFont}
                                fontSize="0.85em"
                                color={descriptionColor}
                              >
                                <TextWithLineBreaks
                                  text={product.description}
                                />
                              </Text>
                            )}
                        </GridItem>
                        <GridItem
                          marginTop={5}
                          colSpan={getProductRightColumnWidth(product)}
                        >
                          <Heading
                            display="flex"
                            fontFamily={contentFont}
                            justifyContent="flex-end"
                            as="h2"
                            size="xs"
                          >
                            {displayProductPrice(product)}
                          </Heading>
                        </GridItem>
                        <GridItem
                          marginTop={5}
                          colSpan={getGapColumnWidth()}
                        ></GridItem>
                      </Fragment>
                    ))}
                </Grid>
              </Box>
            </>
          ))}
      </Container>
      {categoryId !== undefined && (
        <ChoosePhotoModal
          categories={categories}
          categoryId={categoryId}
          setCategoryId={setCategoryId}
          setBackground={setBackground}
          uploadImage={uploadImage}
        />
      )}
    </>
  );
}
