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
import { HiTemplate } from "react-icons/hi";
import styles from "@/styles/components/design-menu/templateDrawer.module.css";
import { Menu } from "@prisma/client";
import { RadioCard } from "./form/radio-card";
import { templateToMenu } from "@/lib/data/template-data";

interface TemplateDrawerProps {
  menu: Menu;
  isTemplateDrawerOpen: boolean;
  setTemplateDrawerOpen: (b: boolean) => void;
  setMenu: (m: Menu) => void;
  onUpdateTemplate: () => void;
}

export function TemplateDrawer({
  menu,
  setMenu,
  isTemplateDrawerOpen,
  setTemplateDrawerOpen,
  onUpdateTemplate,
}: TemplateDrawerProps) {
  return (
    <>
      <Button
        leftIcon={<HiTemplate />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setTemplateDrawerOpen(true)}
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
        onClick={() => setTemplateDrawerOpen(true)}
        className={`${styles.template_button} ${styles.template_button_mobile}`}
      />
      <Drawer
        isOpen={isTemplateDrawerOpen}
        placement="right"
        onClose={() => setTemplateDrawerOpen(false)}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Apply a template</DrawerHeader>
          <form onSubmit={onUpdateTemplate} className={styles.form}>
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
                onClick={() => setTemplateDrawerOpen(false)}
              >
                Close
              </Button>
              <Button
                onClick={onUpdateTemplate}
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
