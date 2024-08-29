import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const middlewarePublic = (url: NextURL) => {
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.match(/\.\w+$/)
  ) {
    return NextResponse.next();
  }
};
