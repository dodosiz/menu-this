import { parse, serialize } from "cookie";
import { NextApiRequest, NextApiResponse } from "next";
import Iron from "@hapi/iron";
import { Session } from "@supabase/supabase-js";

export async function getTokenFromCookie(
  req: NextApiRequest
): Promise<Session | null> {
  const cookie = req.headers?.cookie;
  const cookies = parse(cookie || "");
  const tokenCookie = cookies[TEMP_COOKIE];
  if (tokenCookie) {
    const session = (await Iron.unseal(
      tokenCookie,
      TEMP_TOKEN_SECRET as unknown as Iron.Password,
      Iron.defaults
    )) as Session;

    return session;
  }
  return null;
}

export async function setTokenCookie(res: NextApiResponse, session: Session) {
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
}

export function removeTokenCookie(res: NextApiResponse) {
  const cookie = serialize(TEMP_COOKIE, "", {
    maxAge: -1,
    path: "/",
  });

  res.setHeader("Set-Cookie", cookie);
}

const TEMP_TOKEN_SECRET = process.env.TEMP_TOKEN_SECRET!;
const TEMP_COOKIE = process.env.TEMP_COOKIE!;
