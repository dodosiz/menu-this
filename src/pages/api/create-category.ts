import { CategoryData } from "@/components/categoryForm";
import { createCategory } from "@/lib/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as CategoryData;
    const id = await createCategory(data);
    res.status(200).json({ id });
  }
}
