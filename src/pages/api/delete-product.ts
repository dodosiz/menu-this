import { deleteProduct } from "@/lib/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const data = req.body as { id: string };
    await deleteProduct(data.id);
    res.status(200).end();
  }
}
