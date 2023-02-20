import { createCategory, CreateCategoryData } from "@/lib/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as CreateCategoryData;
    const id = await createCategory(data);
    res.status(200).json({ id });
  }
}
