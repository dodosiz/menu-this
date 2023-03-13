import { Brand, Category, Menu, Product } from "@prisma/client";
import { getCategories } from "./categories";
import { prisma } from "../core/prisma";
import { getProductsInCategories } from "./products";

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

export async function getMenuViewData(menuId: string): Promise<MenuViewData> {
  const menu = await prisma.menu.findUniqueOrThrow({ where: { id: menuId } });
  const categories = await getCategories(menu.userId);
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
  const brand = await prisma.brand.findFirstOrThrow({
    where: { userId: menu.userId },
  });
  return {
    menu,
    categories: categories.map((c) => ({
      ...c,
      created_at: null,
    })),
    productMap,
    brand,
  };
}
