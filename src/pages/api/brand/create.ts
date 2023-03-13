import { createBrand, CreateBrandData } from "@/lib/data/brand";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as CreateBrandData;
    const result = await createBrand(data);
    res.status(200).json(result);
  }
}
