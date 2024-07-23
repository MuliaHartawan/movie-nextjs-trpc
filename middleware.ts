import { NextFetchEvent, NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import { permissionMapper } from "./utils";

export async function middleware(req: NextRequest, _event: NextFetchEvent) {
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
  const loginUrl = new URL("/auth/login", url.origin);
  const dashboardUrl = new URL("/dashboard", url.origin);
  const deniedUrl = new URL("/denied", url.origin);

  // Bypass static files, API routes, and other non-route requests
  if (
    url.pathname.startsWith("/_next/") ||
    url.pathname.startsWith("/static/") ||
    url.pathname.startsWith("/api/") ||
    url.pathname.match(/\.\w+$/)
  ) {
    return NextResponse.next();
  }

  if (url.pathname.startsWith("/dashboard") && !session) {
    return NextResponse.redirect(loginUrl);
  }

  if (url.pathname.startsWith("/auth") && session) {
    return NextResponse.redirect(dashboardUrl);
  }

  if (session) {
    const userRole = session?.user?.role;

    const matchingRoute = permissionMapper.find((route) => {
      const routeRegex = new RegExp(`^${route.url.replace(/\/$/, "")}$`);
      const isMatch = routeRegex.test(url.pathname);
      return isMatch;
    });

    if (matchingRoute) {
      const isAuthorized =
        matchingRoute.permissions.length === 0 ||
        matchingRoute.permissions.some((permission) => userRole?.permissions?.includes(permission));

      if (!isAuthorized) {
        return NextResponse.redirect(deniedUrl);
      }
    }
  }

  return NextResponse.next();
}
