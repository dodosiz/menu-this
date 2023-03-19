import { Category, getCategories } from "./categories";
import { getProducts, Product } from "./products";
import { Brand, getBrand } from "./brand";
import { getMenuOrThrow, Menu } from "./menu";

export interface MenuViewData {
  menu: Menu;
  categories: Category[];
  products: Product[];
  brand: Brand;
}

export type ProductMapView = {
  [categoryId: string]: Product[];
};

export async function getMenuViewData(userId: string): Promise<MenuViewData> {
  const menu = await getMenuOrThrow(userId);
  const categories = await getCategories(userId);
  const products = await getProducts(userId);
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
    })),
    products: products.map((p) => ({ ...p })),
    brand: { title: brand ? brand.title : "" },
  };
}
