import { hasCommonElements, permissionMapper } from "@/utils/index";
import { JWT } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";

export const middlewarePermission = (url: NextURL, session: JWT | null) => {
  const deniedUrl = new URL("/denied", url.origin);
  if (session) {
    const userRole = session?.user?.role;

    const matchingRoute = permissionMapper.find((route) => {
      const routeRegex = new RegExp(`^${route.url.replace(/\/$/, "")}$`);
      const isMatch = routeRegex.test(url.pathname);
      return isMatch;
    });

    if (matchingRoute) {
      const isAuthorized = hasCommonElements(matchingRoute.permissions, userRole?.permissions);
      if (!isAuthorized) {
        return NextResponse.redirect(deniedUrl);
      }
    }
  }

  return NextResponse.next();
};
