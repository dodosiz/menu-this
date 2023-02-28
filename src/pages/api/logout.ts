import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  res.writeHead(302, { Location: "/" });
  res.end();
}
