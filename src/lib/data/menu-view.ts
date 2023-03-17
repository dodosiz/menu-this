import { Category, Product } from "@prisma/client";
import { getCategories } from "./categories";
import { prisma } from "../core/prisma";
import { getProductsInCategories } from "./products";
import { Brand, getBrand } from "./brand";
import { getMenuOrThrow, Menu } from "./menu";

export interface MenuViewData {
  menu: Menu;
  categories: CategoryView[];
  productMap: ProductMapView;
  brand: Brand;
}

export type CategoryView = Omit<Category, "created_at">;

export type ProductMapView = {
  [categoryId: string]: Omit<Product, "created_at">[];
};

export async function getMenuViewData(userId: string): Promise<MenuViewData> {
  const menu = await getMenuOrThrow(userId);
  const categories = await getCategories(userId);
  const products = await getProductsInCategories(categories.map((c) => c.id));
  const productMap: ProductMapView = {};
  for (const category of categories) {
    const productsInCategory = products.filter(
      (p) => p.categoryId === category.id
    );
    productMap[category.id] = productsInCategory.map((p) => ({
      ...p,
      created_at: null,
    }));
  }
  const brand = await getBrand(userId);
  return {
    menu: {
      brandColor: menu.brandColor,
      titleColor: menu.titleColor,
      nameColor: menu.nameColor,
      descriptionColor: menu.descriptionColor,
      backgroundColor: menu.backgroundColor,
      brandMargin: menu.brandMargin,
      titleMargin: menu.titleMargin,
      nameMargin: menu.nameMargin,
      nameTitleMargin: menu.nameTitleMargin,
      brandSize: menu.brandSize,
      titleSize: menu.titleSize,
      nameSize: menu.nameSize,
      descriptionSize: menu.descriptionSize,
      brandFont: menu.brandFont,
      titleFont: menu.titleFont,
      contentFont: menu.contentFont,
      template: menu.template,
    },
    categories: categories.map((c) => ({
      ...c,
      created_at: null,
    })),
    productMap,
    brand: { title: brand.title },
  };
}
