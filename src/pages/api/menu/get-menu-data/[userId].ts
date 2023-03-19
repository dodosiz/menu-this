import { Category, getCategories } from "@/lib/data/categories";
import { getProductsInCategory, Product } from "@/lib/data/products";
import { NextApiRequest, NextApiResponse } from "next";

export interface MenuData {
  initialCategories: Category[];
  initialProductMap: ProductMap;
}

export type ProductMap = { [categoryId: string]: Product[] };

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  const initialCategories = await getCategories(userId as string);
  const initialProductMap: ProductMap = {};
  for (const category of initialCategories) {
    initialProductMap[category.id] = await getProductsInCategory(
      category.id,
      userId as string
    );
  }
  res.status(200).json({ initialCategories, initialProductMap });
}
