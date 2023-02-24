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
        title_color: "#319795",
        name_color: "#2d3748",
        description_color: "#718096",
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

export interface UpdateMenuData {
  menuId: string;
  titleColor: string;
}

export async function updateMenu(data: UpdateMenuData) {
  await prisma.menu.update({
    data: {
      title_color: data.titleColor,
    },
    where: {
      id: data.menuId,
    },
  });
}