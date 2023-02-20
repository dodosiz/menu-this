import { UpdateProductData } from "@/components/productForm";
import { updateProduct } from "@/lib/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as UpdateProductData;
    await updateProduct(data);
    res.status(200).end();
  }
}
