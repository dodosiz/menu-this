import { DeleteData, deleteProduct } from "@/lib/data/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const data = req.body as DeleteData;
    await deleteProduct(data);
    res.status(200).end();
  }
}
