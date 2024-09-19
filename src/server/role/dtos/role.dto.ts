import { Role } from "@prisma/client";

export type RoleDto = Pick<Role, "name"> & { permissionIds: string[] };
