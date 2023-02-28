import { createCategory, CreateCategoryData } from "@/lib/data/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as CreateCategoryData;
    const result = await createCategory(data);
    res.status(200).json(result);
  }
}
