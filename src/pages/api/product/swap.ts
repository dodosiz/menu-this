import { swap, SwapData } from "@/lib/data/products";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as SwapData;
    const result = await swap(data);
    res.status(200).json(result);
  }
}
