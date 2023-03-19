import { Category, getCategories } from "@/lib/data/categories";
import { getMenu, Menu } from "@/lib/data/menu";
import { getProductsInCategory } from "@/lib/data/products";
import { NextApiRequest, NextApiResponse } from "next";
import { ProductMap } from "../get-menu-data/[userId]";

export interface DesignMenuData {
  menu: Menu | null;
  categories: Category[];
  productMap: ProductMap;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  // design part
  const menu = await getMenu(userId as string);
  // data part
  const categories = await getCategories(userId as string);
  const productMap: ProductMap = {};
  for (const category of categories) {
    productMap[category.id] = await getProductsInCategory(
      category.id,
      userId as string
    );
  }
  const data: DesignMenuData = { menu, categories, productMap };
  res.status(200).json(data);
}
