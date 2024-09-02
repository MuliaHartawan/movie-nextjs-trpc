import { JWT } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const middlewareAuth = (url: NextURL, session: JWT | null) => {
  const loginUrl = new URL("/auth/login", url.origin);
  const dashboardUrl = new URL("/dashboard", url.origin);
  if (
    !(
      url.pathname.startsWith("/auth/login") ||
      url.pathname.startsWith("/auth/otp") ||
      url.pathname.startsWith("/auth/forgot") ||
      url.pathname.startsWith("/auth/register")
    ) &&
    !session
  ) {
    return NextResponse.redirect(loginUrl);
  }

  if (url.pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(dashboardUrl);
  }
};
