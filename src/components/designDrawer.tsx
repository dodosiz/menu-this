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
  Input,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDesignServices } from "react-icons/md";
import styles from "@/styles/components/designDrawer.module.css";
import { Menu } from "@prisma/client";
import { UpdateMenuData } from "@/lib/menu";
import { ChromePicker, SketchPicker } from "react-color";

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
  const [titleColor, setTitleColor] = useState(menu.title_color);
  const [showTitleColorPicker, setShowTitleColorPicker] = useState(false);

  async function updateMenu() {
    const data: UpdateMenuData = {
      menuId: menu.id,
      titleColor,
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
          <form onSubmit={updateMenu}>
            <DrawerBody>
              <Input
                backgroundColor={titleColor}
                name="titleColor"
                value={titleColor}
                placeholder="Title color"
                focusBorderColor={titleColor}
                onClick={() => setShowTitleColorPicker(!showTitleColorPicker)}
              />
              {showTitleColorPicker && (
                <ChromePicker
                  color={titleColor}
                  onChangeComplete={(c) => setTitleColor(c.hex)}
                />
              )}
            </DrawerBody>
            <DrawerFooter>
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
