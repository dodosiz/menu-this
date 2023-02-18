import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import { setTokenCookie } from "@/lib/cookies";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = req.body.session as Session;
  await setTokenCookie(res, session);
  res.status(200).send({ done: true });
}
