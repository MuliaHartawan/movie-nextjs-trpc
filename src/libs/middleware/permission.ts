import { JWT } from "next-auth/jwt";
import { NextURL } from "next/dist/server/web/next-url";
import { NextResponse } from "next/server";
import { ROUTE } from "../constant/route";
import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { hasCommonElements } from "@/utils/type";

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

// TODO: Find better places
const permissionMapper = [
  {
    url: ROUTE.DASHBOARD,
    permissions: [PERMISSIONS.DASHBOARD],
  },

  {
    url: ROUTE.SNACKS,
    permissions: [PERMISSIONS.SNACK_READ],
  },
  {
    url: ROUTE.SNACKS_FORM,
    permissions: [PERMISSIONS.SNACK_CREATE, PERMISSIONS.SNACK_UPDATE],
  },
  {
    url: ROUTE.SNACKS_DETAIL,
    permissions: [PERMISSIONS.SNACK_DETAIL],
  },

  {
    url: ROUTE.USERS,
    permissions: [PERMISSIONS.USER_READ],
  },
  {
    url: ROUTE.USERS_FORM,
    permissions: [PERMISSIONS.USER_CREATE, PERMISSIONS.USER_UPDATE],
  },
  {
    url: ROUTE.USERS_DETAIL,
    permissions: [PERMISSIONS.USER_DETAIL],
  },

  {
    url: ROUTE.ROLES,
    permissions: [PERMISSIONS.ROLE_READ],
  },
  {
    url: ROUTE.ROLES_FORM,
    permissions: [PERMISSIONS.ROLE_CREATE, PERMISSIONS.ROLE_UPDATE],
  },
  {
    url: ROUTE.ROLES_DETAIL,
    permissions: [PERMISSIONS.ROLE_DETAIL],
  },
  {
    url: ROUTE.MOVIE,
    permissions: [PERMISSIONS.MOVIE_READ],
  },
  {
    url: ROUTE.MOVIE_FORM,
    permissions: [PERMISSIONS.MOVIE_CREATE, PERMISSIONS.MOVIE_UPDATE],
  },
  {
    url: ROUTE.MOVIE_DETAIL,
    permissions: [PERMISSIONS.MOVIE_DETAIL],
  },
  {
    url: ROUTE.STUDIO,
    permissions: [PERMISSIONS.STUDIO_READ],
  },
  {
    url: ROUTE.STUDIO_FORM,
    permissions: [PERMISSIONS.STUDIO_CREATE, PERMISSIONS.STUDIO_UPDATE],
  },
  {
    url: ROUTE.STUDIO_DETAIL,
    permissions: [PERMISSIONS.STUDIO_DETAIL],
  },
  {
    url: ROUTE.SCHEDULE,
    permissions: [PERMISSIONS.SCREEN_SCHEDULE_READ],
  },
  {
    url: ROUTE.SCHEDULE_FORM,
    permissions: [PERMISSIONS.SCREEN_SCHEDULE_CREATE, PERMISSIONS.SCREEN_SCHEDULE_UPDATE],
  },
  {
    url: ROUTE.SCHEDULE_DETAIL,
    permissions: [PERMISSIONS.SCREEN_SCHEDULE_DETAIL],
  },
];
