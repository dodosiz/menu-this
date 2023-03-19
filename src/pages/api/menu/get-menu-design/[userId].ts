import { Category, getCategories } from "@/lib/data/categories";
import { getMenu, Menu } from "@/lib/data/menu";
import { getProducts, Product } from "@/lib/data/products";
import { NextApiRequest, NextApiResponse } from "next";

export interface DesignMenuData {
  menu: Menu | null;
  categories: Category[];
  products: Product[];
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
  const products = await getProducts(userId as string);
  const data: DesignMenuData = { menu, categories, products };
  res.status(200).json(data);
}
