import { PERMISSIONS } from "@/common/enums/permissions.enum";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function permissionSeeder() {
  const dummyPermissions = [
    {
      name: PERMISSIONS.DASHBOARD,
    },
    {
      name: PERMISSIONS.SNACK_CREATE,
    },
    {
      name: PERMISSIONS.SNACK_READ,
    },
    {
      name: PERMISSIONS.SNACK_UPDATE,
    },
    {
      name: PERMISSIONS.SNACK_DELETE,
    },
    {
      name: PERMISSIONS.SNACK_DETAIL,
    },
    {
      name: PERMISSIONS.USER_CREATE,
    },
    {
      name: PERMISSIONS.USER_READ,
    },
    {
      name: PERMISSIONS.USER_UPDATE,
    },
    {
      name: PERMISSIONS.USER_DELETE,
    },
    {
      name: PERMISSIONS.USER_DETAIL,
    },
    {
      name: PERMISSIONS.ROLE_CREATE,
    },
    {
      name: PERMISSIONS.ROLE_UPDATE,
    },
    {
      name: PERMISSIONS.ROLE_DELETE,
    },
    {
      name: PERMISSIONS.ROLE_DETAIL,
    },
    {
      name: PERMISSIONS.ROLE_READ,
    },
    {
      name: PERMISSIONS.MOVIE_CREATE,
    },
    {
      name: PERMISSIONS.MOVIE_UPDATE,
    },
    {
      name: PERMISSIONS.MOVIE_DELETE,
    },
    {
      name: PERMISSIONS.MOVIE_DETAIL,
    },
    {
      name: PERMISSIONS.MOVIE_READ,
    },
    {
      name: PERMISSIONS.STUDIO_CREATE,
    },
    {
      name: PERMISSIONS.STUDIO_UPDATE,
    },
    {
      name: PERMISSIONS.STUDIO_DELETE,
    },
    {
      name: PERMISSIONS.STUDIO_DETAIL,
    },
    {
      name: PERMISSIONS.STUDIO_READ,
    },
    {
      name: PERMISSIONS.SCREEN_SCHEDULE_CREATE,
    },
    {
      name: PERMISSIONS.SCREEN_SCHEDULE_UPDATE,
    },
    {
      name: PERMISSIONS.SCREEN_SCHEDULE_DELETE,
    },
    {
      name: PERMISSIONS.SCREEN_SCHEDULE_DETAIL,
    },
    {
      name: PERMISSIONS.SCREEN_SCHEDULE_READ,
    },
  ];

  await prisma.permission.createMany({
    data: dummyPermissions,
  });
}
