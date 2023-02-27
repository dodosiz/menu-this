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
} from "@chakra-ui/react";
import { useState } from "react";
import { HiTemplate } from "react-icons/hi";
import styles from "@/styles/components/templateDrawer.module.css";
import { Menu } from "@prisma/client";
import { RadioCard } from "./form/radio-card";
import { templateToMenu } from "@/lib/template-data";
import { UpdateTemplateData } from "@/lib/menu";

interface TemplateDrawerProps {
  menu: Menu;
  setMenu: (m: Menu) => void;
  setErrorMessage: (m: string) => void;
  setLoading: (b: boolean) => void;
}

export function TemplateDrawer({
  menu,
  setMenu,
  setErrorMessage,
  setLoading,
}: TemplateDrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);

  async function updateMenu() {
    const data: UpdateTemplateData = {
      menuId: menu.id,
      template: menu.template,
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
    const response = await fetch("/api/update-template", options);
    if (response.status === 200) {
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
        leftIcon={<HiTemplate />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setDrawerOpen(true)}
        className={`${styles.template_button} ${styles.template_button_desktop}`}
      >
        Template
      </Button>
      <IconButton
        icon={<HiTemplate />}
        colorScheme="teal"
        aria-label="template"
        variant="outline"
        size="sm"
        onClick={() => setDrawerOpen(true)}
        className={`${styles.template_button} ${styles.template_button_mobile}`}
      />
      <Drawer
        isOpen={isDrawerOpen}
        placement="right"
        onClose={() => setDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Apply a template</DrawerHeader>
          <form onSubmit={updateMenu} className={styles.form}>
            <DrawerBody className={styles.form_body}>
              <RadioCard
                options={Object.keys(templateToMenu)}
                value={menu.template}
                setValue={(v) => {
                  const updatedMenu = templateToMenu[v];
                  setMenu({
                    ...menu,
                    ...updatedMenu,
                    template: v,
                  });
                }}
              />
            </DrawerBody>
            <DrawerFooter className={styles.form_footer}>
              <Button
                colorScheme="gray"
                variant="outline"
                mr={3}
                onClick={() => setDrawerOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={updateMenu}
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
