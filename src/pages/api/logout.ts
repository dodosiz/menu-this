import { removeTokenCookie } from "@/lib/cookies";
import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await supabase.auth.signOut();
  removeTokenCookie(res);
  res.writeHead(302, { Location: "/" });
  res.end();
}
