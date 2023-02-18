import { Session } from "@supabase/supabase-js";
import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import { serialize } from "cookie";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = req.body.session as Session;
  const token = await Iron.seal(
    session,
    TEMP_TOKEN_SECRET as string,
    Iron.defaults
  );
  const cookie = serialize(TEMP_COOKIE, token, {
    maxAge: session.expires_in,
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    sameSite: "lax",
  });

  res.setHeader("Set-Cookie", cookie);
  res.status(200).send({ done: true });
}

const TEMP_TOKEN_SECRET = process.env.TEMP_TOKEN_SECRET!;
const TEMP_COOKIE = process.env.TEMP_COOKIE!;
