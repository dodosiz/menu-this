import { createMenu, CreateMenuData } from "@/lib/data/menu";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const data = req.body as CreateMenuData;
    const menu = await createMenu(data);
    res.status(200).json({ id: menu.id });
  }
}
