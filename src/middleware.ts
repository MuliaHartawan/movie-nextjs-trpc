import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { middlewarePublic } from "@/libs/middleware/public";
import { middlewareAuth } from "./libs/middleware/auth";
import { middlewarePermission } from "./libs/middleware/permission";

export async function middleware(req: NextRequest) {
  const session = await getToken({
    req,
    secret: process.env.AUTH_SECRET!,
    secureCookie: process.env.NODE_ENV === "production",
    salt:
      process.env.NODE_ENV === "production"
        ? "__Secure-authjs.session-token"
        : "authjs.session-token",
  });

  const url = req.nextUrl;

  middlewarePublic(url);
  middlewareAuth(url, session);
  middlewarePermission(url, session);
}
