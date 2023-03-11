import { updateDesign, UpdateDesignData } from "@/lib/data/menu";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "PUT") {
    const data = req.body as UpdateDesignData;
    await updateDesign(data);
    res.status(200).end();
  }
}