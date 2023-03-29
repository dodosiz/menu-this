import { BACKGROUND_IMG } from "@/lib/data/template-data";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Grid,
  GridItem,
  Image,
} from "@chakra-ui/react";
import styles from "@/styles/designMenu.module.css";

interface PhotoLibraryProps {
  selectedBackground: string | null;
  setSelectedBackground: (_b: string | null) => void;
}

export function PhotoLibrary({
  selectedBackground,
  setSelectedBackground,
}: PhotoLibraryProps) {
  return (
    <Accordion allowMultiple>
      {Object.keys(BACKGROUND_IMG).map((section) => (
        <AccordionItem key={section}>
          <h2>
            <AccordionButton
              _expanded={{ bg: "teal.500", color: "white" }}
              paddingLeft={0}
            >
              <Box as="span" flex="1" textAlign="left">
                {section}
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel paddingLeft={0} pb={4}>
            <Grid templateColumns="repeat(3, 1fr)" gap={10}>
              {Object.keys(BACKGROUND_IMG[section]).map((id) => (
                <GridItem colSpan={{ base: 3, md: 1 }} key={id}>
                  <Image
                    className={
                      id === selectedBackground
                        ? styles.template_image_active
                        : styles.template_image
                    }
                    id={id === selectedBackground ? "selected" : id}
                    src={BACKGROUND_IMG[section][id].path}
                    alt={BACKGROUND_IMG[section][id].alt}
                    onClick={() => {
                      if (id === selectedBackground) {
                        setSelectedBackground(null);
                      } else {
                        setSelectedBackground(id);
                      }
                    }}
                  />
                </GridItem>
              ))}
            </Grid>
          </AccordionPanel>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
