import { SECONDARY_COLOR, MAIN_COLOR } from "@/constants";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { ProductForm } from "./productForm";
import styles from "@/styles/components/create-menu/product/accordionWithProductForm.module.css";
import { Product, UpdateProductResult } from "@/lib/data/products";

interface AccordionWithProductFormProps {
  categoryId: string;
  products: Product[];
  expanded: number;
  userId: string;
  setErrorMessage: (s: string) => void;
  setExpanded: (n: number) => void;
  addProduct: (p: Product) => void;
  mergeProduct: (p: UpdateProductResult) => void;
}

export function AccordionWithProductForm(props: AccordionWithProductFormProps) {
  return (
    <Accordion
      index={props.expanded}
      onChange={() => props.setExpanded(props.expanded === 1 ? 0 : 1)}
      allowToggle
      className={styles.accordion_with_product_form}
    >
      <AccordionItem>
        <h2>
          <AccordionButton
            paddingLeft={0}
            color={SECONDARY_COLOR}
            _expanded={{ bg: "teal.100", color: MAIN_COLOR }}
          >
            <Box as="span" flex="1" textAlign="left">
              Add a new product
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel paddingLeft={0} pb={4}>
          <ProductForm
            products={props.products}
            categoryId={props.categoryId}
            setErrorMessage={props.setErrorMessage}
            userId={props.userId}
            addProduct={props.addProduct}
            mergeProduct={props.mergeProduct}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}
