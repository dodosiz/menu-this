import { Category, Menu } from "@prisma/client";
import { prisma } from "../core/prisma";
import { templateToMenu } from "./template-data";

export async function getMenuByUserId(userId: string): Promise<Menu | null> {
  const menu = await prisma.menu.findFirst({
    where: {
      userId,
    },
  });
  return menu;
}

export interface CreateMenuData extends UpdateMenuData {
  userId: string;
}

export async function createMenu(data: CreateMenuData) {
  const menu = await prisma.menu.create({
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
      userId: data.userId,
    },
  });
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

export interface UpdateDesignData {
  menu: UpdateMenuData;
  template: string | null;
  categories: Category[];
}

export async function updateDesign(data: UpdateDesignData) {
  // update template
  const menu = data.template ? templateToMenu[data.template] : {};
  await prisma.menu.update({
    data: {
      ...menu,
      template: data.template,
    },
    where: {
      id: data.menu.menuId,
    },
  });
  // update menu
  await prisma.menu.update({
    data: {
      title_color: data.menu.titleColor,
      name_color: data.menu.nameColor,
      description_color: data.menu.descriptionColor,
      background_color: data.menu.backgroundColor,
      title_margin: data.menu.titleMargin,
      name_margin: data.menu.nameMargin,
      name_title_margin: data.menu.nameTitleMargin,
      title_size: data.menu.titleSize,
      name_size: data.menu.nameSize,
      description_size: data.menu.descriptionSize,
      title_font: data.menu.titleFont,
      content_font: data.menu.contentFont,
    },
    where: {
      id: data.menu.menuId,
    },
  });
  // update background images
  for (const c of data.categories) {
    await prisma.category.update({
      data: {
        background: c.background,
      },
      where: {
        id: c.id,
      },
    });
  }
}
