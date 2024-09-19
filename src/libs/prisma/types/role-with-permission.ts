import { Prisma } from "@prisma/client";

export type RoleWithPermission = Prisma.RoleGetPayload<{
  include: {
    rolePermissions: {
      include: {
        permission: true;
      };
    };
  };
}>;
