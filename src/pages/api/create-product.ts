import { ProductData } from "@/components/productForm";
import { createProduct } from "@/lib/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as ProductData;
    const result = await createProduct(data);
    res.status(200).json(result);
  }
}
