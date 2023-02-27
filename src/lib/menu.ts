import { Menu } from "@prisma/client";
import { prisma } from "./prisma";
import { templateToMenu } from "./template-data";

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
  nameColor: string;
  descriptionColor: string;
  backgroundColor: string;
  titleMargin: number;
  nameMargin: number;
  nameTitleMargin: number;
  titleSize: string;
  nameSize: string;
  descriptionSize: string;
  titleFont: string;
  contentFont: string;
}

export async function updateMenu(data: UpdateMenuData) {
  await prisma.menu.update({
    data: {
      title_color: data.titleColor,
      name_color: data.nameColor,
      description_color: data.descriptionColor,
      background_color: data.backgroundColor,
      title_margin: data.titleMargin,
      name_margin: data.nameMargin,
      name_title_margin: data.nameTitleMargin,
      title_size: data.titleSize,
      name_size: data.nameSize,
      description_size: data.descriptionSize,
      title_font: data.titleFont,
      content_font: data.contentFont,
    },
    where: {
      id: data.menuId,
    },
  });
}

export interface UpdateTemplateData {
  menuId: string;
  template: string | null;
}

export async function updateTemplate(data: UpdateTemplateData) {
  const menu = data.template ? templateToMenu[data.template] : {};
  await prisma.menu.update({
    data: {
      ...menu,
      template: data.template,
    },
    where: {
      id: data.menuId,
    },
  });
}

export async function getMenuIds(): Promise<string[]> {
  const menus = await prisma.menu.findMany();
  return menus.map((m) => m.id);
}
