import { EditCategoryData } from "@/components/categoryForm";
import { updateCategory } from "@/lib/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as EditCategoryData;
    await updateCategory(data);
    res.status(200).end();
  }
}
