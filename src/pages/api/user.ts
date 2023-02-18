import { supabase } from "@/lib/supabase";
import { NextApiRequest, NextApiResponse } from "next";

/**
 * Verify the user and get data server side
 */
export default async function user(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.token as string;

  const { data: user, error } = await supabase.auth.getUser(token);

  if (error) return res.status(401).json({ error: error.message });
  return res.status(200).json(user);
}
