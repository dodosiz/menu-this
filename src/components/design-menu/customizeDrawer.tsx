import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  Text,
} from "@chakra-ui/react";
import { MdDesignServices } from "react-icons/md";
import styles from "@/styles/components/design-menu/customizeDrawer.module.css";
import { ColorPicker } from "./form/color-picker";
import { SliderInput } from "./form/slider-input";
import { SelectInput } from "./form/select-input";
import { Menu } from "@/lib/data/menu";

interface DesignDrawerProps {
  menu: Menu;
  isCustomDrawerOpen: boolean;
  setCustomDrawerOpen: (b: boolean) => void;
  setMenu: (m: Menu) => void;
  setCustomDirty: (b: boolean) => void;
}

const FONTS = [
  "'Montserrat', sans-serif",
  "'Open Sans', sans-serif",
  "'Raleway', sans-serif",
  "'Roboto', sans-serif",
  "'Poppins', sans-serif",
  "'Playfair Display', serif",
  "'Lato', sans-serif",
  "'Handlee', cursive",
  "'Beth Ellen', cursive",
  "'Gloria Hallelujah', cursive",
];

const FONT_DISPLAY_OPTIONS = {
  "'Montserrat', sans-serif": "Montserrat",
  "'Open Sans', sans-serif": "Open Sans",
  "'Raleway', sans-serif": "Raleway",
  "'Roboto', sans-serif": "Roboto",
  "'Poppins', sans-serif": "Poppins",
  "'Playfair Display', serif": "Playfair Display",
  "'Lato', sans-serif": "Lato",
  "'Handlee', cursive": "Handlee",
  "'Beth Ellen', cursive": "Beth Ellen",
  "'Gloria Hallelujah', cursive": "Gloria Hallelujah",
};

export function CustomizeDrawer({
  menu,
  isCustomDrawerOpen,
  setCustomDrawerOpen,
  setMenu,
  setCustomDirty,
}: DesignDrawerProps) {
  return (
    <>
      <Button
        leftIcon={<MdDesignServices />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setCustomDrawerOpen(true)}
        className={`${styles.design_button} ${styles.design_button_desktop}`}
      >
        Customize
      </Button>
      <IconButton
        icon={<MdDesignServices />}
        colorScheme="teal"
        aria-label="design"
        variant="outline"
        size="sm"
        onClick={() => setCustomDrawerOpen(true)}
        className={`${styles.design_button} ${styles.design_button_mobile}`}
      />
      <Drawer
        isOpen={isCustomDrawerOpen}
        placement="right"
        onClose={() => setCustomDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Customize Menu</DrawerHeader>
          <form className={styles.form}>
            <DrawerBody className={styles.form_body}>
              <Accordion allowMultiple>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.500", color: "white" }}
                      paddingLeft={0}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Edit colors
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel paddingLeft={0} pb={4}>
                    <Text className={styles.label}>Brand name color</Text>
                    <ColorPicker
                      value={menu.brandColor}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          brandColor: c,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Category name color</Text>
                    <ColorPicker
                      value={menu.titleColor}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          titleColor: c,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product name and price color
                    </Text>
                    <ColorPicker
                      value={menu.nameColor}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          nameColor: c,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Description color</Text>
                    <ColorPicker
                      value={menu.descriptionColor}
                      setValue={(dc) => {
                        setMenu({
                          ...menu,
                          descriptionColor: dc,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Background color</Text>
                    <ColorPicker
                      value={menu.backgroundColor}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          backgroundColor: c,
                        });
                        setCustomDirty(true);
                      }}
                    />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.500", color: "white" }}
                      paddingLeft={0}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Edit margins
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel paddingLeft={0} pb={4}>
                    <Text className={styles.label}>Brand name top margin</Text>
                    <SliderInput
                      maxValue={400}
                      value={menu.brandMargin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          brandMargin: m,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Category name top margin
                    </Text>
                    <SliderInput
                      maxValue={400}
                      value={menu.titleMargin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          titleMargin: m,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product name top margin
                    </Text>
                    <SliderInput
                      maxValue={20}
                      value={menu.nameMargin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          nameMargin: m,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product to category margin
                    </Text>
                    <SliderInput
                      maxValue={200}
                      value={menu.nameTitleMargin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          nameTitleMargin: m,
                        });
                        setCustomDirty(true);
                      }}
                    />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.500", color: "white" }}
                      paddingLeft={0}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Edit sizes
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel paddingLeft={0} pb={4}>
                    <Text className={styles.label}>Brand name size</Text>
                    <SelectInput
                      options={["4xl", "2xl", "xl", "lg", "md", "sm"]}
                      value={menu.brandSize}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          brandSize: s,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Category name size</Text>
                    <SelectInput
                      options={["xl", "lg", "md", "sm"]}
                      value={menu.titleSize}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          titleSize: s,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product name and price size
                    </Text>
                    <SelectInput
                      options={["xl", "lg", "md", "sm"]}
                      value={menu.nameSize}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          nameSize: s,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product description size
                    </Text>
                    <SelectInput
                      options={["1.4em", "1.2em", "1em", "0.8em"]}
                      displayOption={{
                        "1.4em": "xl",
                        "1.2em": "lg",
                        "1em": "md",
                        "0.8em": "sm",
                      }}
                      value={menu.descriptionSize}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          descriptionSize: s,
                        });
                        setCustomDirty(true);
                      }}
                    />
                  </AccordionPanel>
                </AccordionItem>
                <AccordionItem>
                  <h2>
                    <AccordionButton
                      _expanded={{ bg: "teal.500", color: "white" }}
                      paddingLeft={0}
                    >
                      <Box as="span" flex="1" textAlign="left">
                        Edit fonts
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel paddingLeft={0} pb={4}>
                    <Text className={styles.label}>Brand name font</Text>
                    <SelectInput
                      options={FONTS}
                      displayOption={FONT_DISPLAY_OPTIONS}
                      value={menu.brandFont}
                      setValue={(f) => {
                        setMenu({
                          ...menu,
                          brandFont: f,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Category title font</Text>
                    <SelectInput
                      options={FONTS}
                      displayOption={FONT_DISPLAY_OPTIONS}
                      value={menu.titleFont}
                      setValue={(f) => {
                        setMenu({
                          ...menu,
                          titleFont: f,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Products font</Text>
                    <SelectInput
                      options={FONTS}
                      displayOption={FONT_DISPLAY_OPTIONS}
                      value={menu.contentFont}
                      setValue={(f) => {
                        setMenu({
                          ...menu,
                          contentFont: f,
                        });
                        setCustomDirty(true);
                      }}
                    />
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
            </DrawerBody>
            <DrawerFooter className={styles.form_footer}>
              <Button
                colorScheme="gray"
                variant="outline"
                mr={3}
                onClick={() => setCustomDrawerOpen(false)}
              >
                Close
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
