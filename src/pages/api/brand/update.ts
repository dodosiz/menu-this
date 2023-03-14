import { updateBrand, UpdateBrandData } from "@/lib/data/brand";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as UpdateBrandData;
    await updateBrand(data);
    res.status(200).end();
  }
}
