import { LOGO_COLOR, MAIN_COLOR, SECONDARY_COLOR } from "@/styles/constants";
import { Menu } from "@prisma/client";
import { prisma } from "./prisma";

export async function getMenuByUserId(userId: string): Promise<Menu> {
  const menu = await prisma.menu.findFirst({
    where: {
      userId,
    },
  });
  if (!menu) {
    const newMenu = await prisma.menu.create({
      data: {
        title_color: LOGO_COLOR,
        name_color: MAIN_COLOR,
        description_color: SECONDARY_COLOR,
        title_margin: 10,
        name_margin: 2,
        name_title_margin: 5,
        title_size: "lg",
        name_size: "md",
        description_size: "1em",
        title_font: "'Open Sans', sans-serif",
        content_font: "'Raleway', sans-serif",
        background_color: "#fdfdfd",
        userId,
      },
    });
    return newMenu;
  }
  return menu;
}
