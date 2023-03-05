import { getUserStatus } from "@/lib/data/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { userId } = req.query;
  const { requested } = await getUserStatus(userId as string);
  res.status(200).json({ requested });
}
