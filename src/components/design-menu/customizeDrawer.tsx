import {
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
import { Menu, Variant } from "@/lib/data/menu";

interface DesignDrawerProps {
  menu: Menu;
  isCustomDrawerOpen: boolean;
  setCustomDrawerOpen: (_b: boolean) => void;
  setMenu: (_m: Menu) => void;
  setCustomDirty: (_b: boolean) => void;
}

const VARIANTS = ["none", "inverse", "bordered", "underlined"];

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
              <Text className={styles.label}>Font color</Text>
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
              <Text className={styles.label}>Category top margin</Text>
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
              <Text className={styles.label}>Content font</Text>
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
              <Text className={styles.label}>Title styles</Text>
              <SelectInput
                options={VARIANTS}
                value={menu.categoryVariant}
                setValue={(v) => {
                  setMenu({
                    ...menu,
                    categoryVariant: v as Variant,
                  });
                  setCustomDirty(true);
                }}
              />
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
