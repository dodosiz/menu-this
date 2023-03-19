import { deleteCategory } from "@/lib/data/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const data = req.body;
    await deleteCategory(data);
    res.status(200).end();
  }
}
