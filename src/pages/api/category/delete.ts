import { deleteCategory, DeleteData } from "@/lib/data/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const data = req.body as DeleteData;
    await deleteCategory(data);
    res.status(200).end();
  }
}
