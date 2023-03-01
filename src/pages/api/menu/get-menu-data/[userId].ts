import { getCategories } from "@/lib/data/categories";
import { getProductsInCategories } from "@/lib/data/products";
import { Category, Product } from "@prisma/client";
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
  const categoryIds = initialCategories.map((c) => c.id);
  const products = await getProductsInCategories(categoryIds);
  const initialProductMap: ProductMap = {};
  for (const category of initialCategories) {
    const productsInCategory = products.filter(
      (p) => p.categoryId === category.id
    );
    initialProductMap[category.id] = productsInCategory;
  }
  res.status(200).json({ initialCategories, initialProductMap });
}