import { getCategories } from "@/lib/data/categories";
import { getMenuByUserIdOrCreateDefault } from "@/lib/data/menu";
import { getProductsInCategories } from "@/lib/data/products";
import { Category, Menu } from "@prisma/client";
import { NextApiRequest, NextApiResponse } from "next";
import { ProductMap } from "../get-menu-data/[userId]";

export interface DesignMenuData {
  menu: Menu;
  categories: Category[];
  productMap: ProductMap;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  // design part
  const menu = await getMenuByUserIdOrCreateDefault(userId as string);
  // data part
  const categories = await getCategories(userId as string);
  const categoryIds = categories.map((c) => c.id);
  const products = await getProductsInCategories(categoryIds);
  const productMap: ProductMap = {};
  for (const category of categories) {
    const productsInCategory = products.filter(
      (p) => p.categoryId === category.id
    );
    productMap[category.id] = productsInCategory;
  }
  res.status(200).json({ menu, categories, productMap });
}