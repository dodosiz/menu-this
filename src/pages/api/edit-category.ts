import { EditCategoryData } from "@/components/categoryForm";
import { createCategory, editCategory } from "@/lib/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as EditCategoryData;
    await editCategory(data);
    res.status(200).end();
  }
}
