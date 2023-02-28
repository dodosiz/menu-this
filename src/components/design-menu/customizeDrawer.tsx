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
import { useState } from "react";
import { MdDesignServices } from "react-icons/md";
import styles from "@/styles/components/design-menu/customizeDrawer.module.css";
import { Menu } from "@prisma/client";
import { UpdateMenuData } from "@/lib/data/menu";
import { ColorPicker } from "./form/color-picker";
import { SliderInput } from "./form/slider-input";
import { SelectInput } from "./form/select-input";

interface DesignDrawerProps {
  menu: Menu;
  setMenu: (m: Menu) => void;
  setErrorMessage: (m: string) => void;
  setLoading: (b: boolean) => void;
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
  setMenu,
  setErrorMessage,
  setLoading,
}: DesignDrawerProps) {
  const [isDrawerOpen, setDrawerOpen] = useState(false);
  // colors
  const [titleColor, setTitleColor] = useState(menu.title_color);
  const [nameColor, setNameColor] = useState(menu.name_color);
  const [descriptionColor, setDescriptionColor] = useState(
    menu.description_color
  );
  const [backgroundColor, setBackgroundColor] = useState(menu.background_color);
  // margins
  const [titleMargin, setTitleMargin] = useState(menu.title_margin);
  const [nameMargin, setNameMargin] = useState(menu.name_margin);
  const [nameTitleMargin, setNameTitleMargin] = useState(
    menu.name_title_margin
  );
  // sizes
  const [titleSize, setTitleSize] = useState(menu.title_size);
  const [nameSize, setNameSize] = useState(menu.name_size);
  const [descriptionSize, setDescriptionSize] = useState(menu.description_size);
  // fonts
  const [titleFont, setTitleFont] = useState(menu.title_font);
  const [contentFont, setContentFont] = useState(menu.content_font);

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
      titleSize,
      nameSize,
      descriptionSize,
      titleFont,
      contentFont,
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
    const response = await fetch("/api/menu/update-menu", options);
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
        leftIcon={<MdDesignServices />}
        colorScheme="teal"
        variant="outline"
        onClick={() => setDrawerOpen(true)}
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
              <Accordion allowToggle allowMultiple>
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
                      value={titleColor}
                      setValue={(c) => {
                        setTitleColor(c);
                        setMenu({
                          ...menu,
                          title_color: c,
                        });
                      }}
                    />
                    <Text className={styles.label}>
                      Product name and price color
                    </Text>
                    <ColorPicker
                      value={nameColor}
                      setValue={(c) => {
                        setNameColor(c);
                        setMenu({
                          ...menu,
                          name_color: c,
                        });
                      }}
                    />
                    <Text className={styles.label}>Description color</Text>
                    <ColorPicker
                      value={descriptionColor}
                      setValue={(dc) => {
                        setDescriptionColor(dc);
                        setMenu({
                          ...menu,
                          description_color: dc,
                        });
                      }}
                    />
                    <Text className={styles.label}>Background color</Text>
                    <ColorPicker
                      value={backgroundColor}
                      setValue={(c) => {
                        setBackgroundColor(c);
                        setMenu({
                          ...menu,
                          background_color: c,
                        });
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
                      value={titleMargin}
                      setValue={(m) => {
                        setTitleMargin(m);
                        setMenu({
                          ...menu,
                          title_margin: m,
                        });
                      }}
                    />
                    <Text className={styles.label}>
                      Product name top margin
                    </Text>
                    <SliderInput
                      maxValue={20}
                      value={nameMargin}
                      setValue={(m) => {
                        setNameMargin(m);
                        setMenu({
                          ...menu,
                          name_margin: m,
                        });
                      }}
                    />
                    <Text className={styles.label}>
                      Product to category margin
                    </Text>
                    <SliderInput
                      maxValue={200}
                      value={nameTitleMargin}
                      setValue={(m) => {
                        setNameTitleMargin(m);
                        setMenu({
                          ...menu,
                          name_title_margin: m,
                        });
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
                      value={titleSize}
                      setValue={(s) => {
                        setTitleSize(s);
                        setMenu({
                          ...menu,
                          title_size: s,
                        });
                      }}
                    />
                    <Text className={styles.label}>
                      Product name and price size
                    </Text>
                    <SelectInput
                      options={["xl", "lg", "md", "sm"]}
                      value={nameSize}
                      setValue={(s) => {
                        setNameSize(s);
                        setMenu({
                          ...menu,
                          name_size: s,
                        });
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
                      value={descriptionSize}
                      setValue={(s) => {
                        setDescriptionSize(s);
                        setMenu({
                          ...menu,
                          description_size: s,
                        });
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
                      value={titleFont}
                      setValue={(f) => {
                        setTitleFont(f);
                        setMenu({
                          ...menu,
                          title_font: f,
                        });
                      }}
                    />
                    <Text className={styles.label}>Products font</Text>
                    <SelectInput
                      options={FONTS}
                      value={contentFont}
                      setValue={(f) => {
                        setContentFont(f);
                        setMenu({
                          ...menu,
                          content_font: f,
                        });
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
