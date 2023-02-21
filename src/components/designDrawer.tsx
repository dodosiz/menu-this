import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/react";
import { useState } from "react";
import { MdDesignServices } from "react-icons/md";
import styles from "@/styles/components/designDrawer.module.css";

export function DesignDrawer() {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  return (
    <>
      <Button
        leftIcon={<MdDesignServices />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setDrawerOpen(true)}
        className={styles.design_button}
      >
        Design
      </Button>
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Design your menu</DrawerHeader>

          <DrawerBody>
            <div>Options will go here</div>
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
            <Button variant="outline" colorScheme="teal">
              Save
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}
