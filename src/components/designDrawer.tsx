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
import { useState } from "react";
import { MdDesignServices } from "react-icons/md";
import styles from "@/styles/components/designDrawer.module.css";
import { Menu } from "@prisma/client";
import { UpdateMenuData } from "@/lib/menu";
import { ColorPicker } from "./form/color-picker";
import { SliderInput } from "./form/slider-input";

interface DesignDrawerProps {
  menu: Menu;
  setMenu: (m: Menu) => void;
  setErrorMessage: (m: string) => void;
  setLoading: (b: boolean) => void;
}

export function DesignDrawer({
  menu,
  setMenu,
  setErrorMessage,
  setLoading,
}: DesignDrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // color
  const [titleColor, setTitleColor] = useState(menu.title_color);
  const [nameColor, setNameColor] = useState(menu.name_color);
  const [descriptionColor, setDescriptionColor] = useState(
    menu.description_color
  );
  const [backgroundColor, setBackgroundColor] = useState(menu.background_color);
  const [titleMargin, setTitleMargin] = useState(menu.title_margin);
  const [nameMargin, setNameMargin] = useState(menu.name_margin);
  const [nameTitleMargin, setNameTitleMargin] = useState(
    menu.name_title_margin
  );

  async function updateMenu() {
    const data: UpdateMenuData = {
      menuId: menu.id,
      titleColor,
      nameColor,
      descriptionColor,
      backgroundColor,
      titleMargin,
      nameMargin,
      nameTitleMargin,
    };
    const JSONdata = JSON.stringify(data);
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };
    setLoading(true);
    const response = await fetch("/api/update-menu", options);
    if (response.status === 200) {
      const updatedMenu: Menu = {
        ...menu,
        title_color: titleColor,
        name_color: nameColor,
        description_color: descriptionColor,
        background_color: backgroundColor,
        title_margin: titleMargin,
        name_margin: nameMargin,
        name_title_margin: nameTitleMargin,
      };
      setMenu(updatedMenu);
      setLoading(false);
      setDrawerOpen(false);
    } else if (response.status === 500) {
      setErrorMessage("Internal server error");
      setLoading(false);
    }
  }

  return (
    <>
      <Button
        leftIcon={<MdDesignServices />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setDrawerOpen(true)}
        className={`${styles.design_button} ${styles.design_button_desktop}`}
      >
        Design
      </Button>
      <IconButton
        icon={<MdDesignServices />}
        colorScheme="teal"
        aria-label="design"
        variant="outline"
        size="sm"
        onClick={() => setDrawerOpen(true)}
        className={`${styles.design_button} ${styles.design_button_mobile}`}
      />
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Customize Menu</DrawerHeader>
          <form onSubmit={updateMenu} className={styles.form}>
            <DrawerBody className={styles.form_body}>
              <Text className={styles.label}>Category name color</Text>
              <ColorPicker value={titleColor} setValue={setTitleColor} />
              <Text className={styles.label}>Product name and price color</Text>
              <ColorPicker value={nameColor} setValue={setNameColor} />
              <Text className={styles.label}>Description color</Text>
              <ColorPicker
                value={descriptionColor}
                setValue={setDescriptionColor}
              />
              <Text className={styles.label}>Background color</Text>
              <ColorPicker
                value={backgroundColor}
                setValue={setBackgroundColor}
              />
              <Text className={styles.label}>Category name top margin</Text>
              <SliderInput value={titleMargin} setValue={setTitleMargin} />
              <Text className={styles.label}>Product name top margin</Text>
              <SliderInput value={nameMargin} setValue={setNameMargin} />
              <Text className={styles.label}>Product to category margin</Text>
              <SliderInput
                value={nameTitleMargin}
                setValue={setNameTitleMargin}
              />
            </DrawerBody>
            <DrawerFooter className={styles.form_footer}>
              <Button
                colorScheme="gray"
                variant="outline"
                mr={3}
                onClick={() => setDrawerOpen(false)}
              >
                Cancel
              </Button>
              <Button
                onClick={updateMenu}
                type="submit"
                variant="outline"
                colorScheme="teal"
              >
                Save
              </Button>
            </DrawerFooter>
          </form>
        </DrawerContent>
      </Drawer>
    </>
  );
}
