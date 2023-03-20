import { Brand, getBrand } from "@/lib/data/brand";
import { Category, getCategories } from "@/lib/data/categories";
import { getMenu, Menu } from "@/lib/data/menu";
import { getProducts, Product } from "@/lib/data/products";
import { NextApiRequest, NextApiResponse } from "next";

export interface MenuData {
  menu: Menu | null;
  categories: Category[];
  products: Product[];
  brand: Brand | null;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  const menu = await getMenu(userId as string);
  const categories = await getCategories(userId as string);
  const products = await getProducts(userId as string);
  const brand = await getBrand(userId as string);
  const data: MenuData = { menu, categories, products, brand };
  res.status(200).json(data);
}
