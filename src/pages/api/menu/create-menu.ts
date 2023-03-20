import { createMenu, MenuDTO } from "@/lib/data/menu";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as MenuDTO;
    await createMenu(data);
    res.status(200).end();
  }
}
