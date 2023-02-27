import { Menu } from "@prisma/client";

export const templateToMenu: { [key: string]: Partial<Menu> } = {
  light: {
    background_color: "grey",
    title_color: "black",
    name_color: "black",
    description_color: "black",
  },
  dark: {
    background_color: "black",
    title_color: "white",
    name_color: "white",
    description_color: "white",
  },
};
