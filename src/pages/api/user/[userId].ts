import { getUserStatus } from "@/lib/data/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  if (req.method === "GET") {
    const { categoryProductCount } = await getUserStatus(userId as string);
    res.status(200).json({ categoryProductCount });
  }
}
