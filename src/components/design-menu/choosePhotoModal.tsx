import { BACKGROUND_IMG } from "@/lib/data/template-data";
import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Button,
  Grid,
  GridItem,
  Image,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import styles from "@/styles/designMenu.module.css";
import { useState } from "react";
import { Category } from "@/lib/data/categories";

interface ChoosePhotoModalProps {
  categoryId: string | undefined;
  categories: Category[];
  setBackground?: (_categoryId: string, _background: string | null) => void;
  setCategoryId: (_b: string | undefined) => void;
}

export function ChoosePhotoModal({
  categoryId,
  setCategoryId,
  setBackground,
  categories,
}: ChoosePhotoModalProps) {
  const category = categories.find((c) => c.id === categoryId);
  const [selectedBackground, setSelectedBackground] = useState<string | null>(
    category ? category.background : null
  );
  return (
    <Modal
      size="4xl"
      isOpen={categoryId !== undefined}
      onClose={() => setCategoryId(undefined)}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          Background Image for &quot;{category?.title}&quot;
        </ModalHeader>
        <ModalCloseButton />

        <ModalBody maxHeight="50vh" overflowY="scroll">
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
        </ModalBody>

        <ModalFooter>
          <Button
            variant="outline"
            onClick={() => {
              setBackground?.(categoryId!!, selectedBackground);
              setCategoryId(undefined);
            }}
            colorScheme="teal"
          >
            Apply
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
