import { cancelDeletion } from "@/lib/data/user";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as { id: string };
    await cancelDeletion(data.id);
    res.status(200).end();
  }
}
