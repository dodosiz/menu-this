import { deleteCategory } from "@/lib/categories";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const data = req.body as { id: string };
    await deleteCategory(data.id);
    res.status(200).end();
  }
}
