import { getUserStatus } from "@/lib/data/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  const { requested, categoryProductCount } = await getUserStatus(
    userId as string
  );
  res.status(200).json({ requested, categoryProductCount });
}
