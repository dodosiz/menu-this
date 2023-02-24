import { ProductMap } from "@/pages/api/get-menu-data/[userId]";
import { SECONDARY_COLOR } from "@/styles/constants";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
} from "@chakra-ui/react";
import { ProductForm } from "./productForm";

interface AccordionWithProductFormProps {
  categoryId: string;
  productMap: ProductMap;
  expanded: number;
  setProductMap: (pm: ProductMap) => void;
  setErrorMessage: (s: string) => void;
  setExpanded: (n: number) => void;
}

export function AccordionWithProductForm(props: AccordionWithProductFormProps) {
  return (
    <Accordion
      index={props.expanded}
      onChange={() => props.setExpanded(props.expanded === 1 ? 0 : 1)}
      allowToggle
    >
      <AccordionItem>
        <h2>
          <AccordionButton paddingLeft={0} color={SECONDARY_COLOR}>
            <Box as="span" flex="1" textAlign="left">
              Add a new product
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel paddingLeft={0} pb={4}>
          <ProductForm
            productMap={props.productMap}
            setProductMap={props.setProductMap}
            categoryId={props.categoryId}
            setErrorMessage={props.setErrorMessage}
          />
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
}