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
import { Menu } from "@prisma/client";
import { ColorPicker } from "./form/color-picker";
import { SliderInput } from "./form/slider-input";
import { SelectInput } from "./form/select-input";

interface DesignDrawerProps {
  menu: Menu;
  isCustomDrawerOpen: boolean;
  setCustomDrawerOpen: (b: boolean) => void;
  setMenu: (m: Menu) => void;
  onUpdateCustomization: () => void;
  setCustomDirty: (b: boolean) => void;
}

const FONTS = [
  "'Montserrat', sans-serif",
  "'Open Sans', sans-serif",
  "'Raleway', sans-serif",
  "'Roboto', sans-serif",
  "'Poppins', sans-serif",
  "'Playfair Display', serif",
];

export function CustomizeDrawer({
  menu,
  isCustomDrawerOpen,
  setCustomDrawerOpen,
  setMenu,
  onUpdateCustomization,
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
          <form onSubmit={onUpdateCustomization} className={styles.form}>
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
                    <Text className={styles.label}>Category name color</Text>
                    <ColorPicker
                      value={menu.title_color}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          title_color: c,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product name and price color
                    </Text>
                    <ColorPicker
                      value={menu.name_color}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          name_color: c,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Description color</Text>
                    <ColorPicker
                      value={menu.description_color}
                      setValue={(dc) => {
                        setMenu({
                          ...menu,
                          description_color: dc,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Background color</Text>
                    <ColorPicker
                      value={menu.background_color}
                      setValue={(c) => {
                        setMenu({
                          ...menu,
                          background_color: c,
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
                    <Text className={styles.label}>
                      Category name top margin
                    </Text>
                    <SliderInput
                      maxValue={400}
                      value={menu.title_margin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          title_margin: m,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product name top margin
                    </Text>
                    <SliderInput
                      maxValue={20}
                      value={menu.name_margin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          name_margin: m,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product to category margin
                    </Text>
                    <SliderInput
                      maxValue={200}
                      value={menu.name_title_margin}
                      setValue={(m) => {
                        setMenu({
                          ...menu,
                          name_title_margin: m,
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
                    <Text className={styles.label}>Category name size</Text>
                    <SelectInput
                      options={["xl", "lg", "md", "sm"]}
                      value={menu.title_size}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          title_size: s,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>
                      Product name and price size
                    </Text>
                    <SelectInput
                      options={["xl", "lg", "md", "sm"]}
                      value={menu.name_size}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          name_size: s,
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
                      value={menu.description_size}
                      setValue={(s) => {
                        setMenu({
                          ...menu,
                          description_size: s,
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
                    <Text className={styles.label}>Category title font</Text>
                    <SelectInput
                      options={FONTS}
                      value={menu.title_font}
                      setValue={(f) => {
                        setMenu({
                          ...menu,
                          title_font: f,
                        });
                        setCustomDirty(true);
                      }}
                    />
                    <Text className={styles.label}>Products font</Text>
                    <SelectInput
                      options={FONTS}
                      value={menu.content_font}
                      setValue={(f) => {
                        setMenu({
                          ...menu,
                          content_font: f,
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
              <Button
                onClick={onUpdateCustomization}
                type="submit"
                variant="outline"
                colorScheme="teal"
              >
                Apply
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
