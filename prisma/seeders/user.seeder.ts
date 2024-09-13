import { ROLE_DUMMY } from "@/common/enums/role-dummy.enum";
import { hashPassword } from "@/libs/auth/password";
import { PrismaClient, Role, User } from "@prisma/client";

const prisma = new PrismaClient();

export async function userSeeder() {
  console.log("Seeding users...");
  const users: Omit<User, "id" | "image" | "otp" | "address" | "createdAt" | "updatedAt">[] = [];

  const roles = await prisma.role.findMany();

  // Manual indexing roles result
  const rolesByName = roles.reduce(
    (acc, role) => {
      acc[role.name] = role;
      return acc;
    },
    {} as Record<string, Role>,
  );

  for (let i = 0; i < 1000; i++) {
    // Push user data to users array
    users.push({
      email: `johndoe${i + 1}@email.com`,
      fullname: `John Doe ${i + 1}`,
      password: await hashPassword(`password${i + 1}`),
      emailVerifiedAt: new Date(),
      roleId: null,
    });

    if (i < 200) {
      // 0 - 199
      users[i].roleId = rolesByName[ROLE_DUMMY.ADMIN]?.id ?? null;
    } else if (i >= 200 && i < 400) {
      // 200 - 399
      users[i].roleId = rolesByName[ROLE_DUMMY.STAFF]?.id ?? null;
    } else if (i >= 400 && i < 600) {
      // 400 - 599
      users[i].roleId = rolesByName[ROLE_DUMMY.ADMIN_SNACK]?.id ?? null;
    } else if (i >= 600 && i < 800) {
      // 600 - 799
      users[i].roleId = rolesByName[ROLE_DUMMY.ADMIN_USER]?.id ?? null;
    } else {
      // 800 - 999
      users[i].roleId = rolesByName[ROLE_DUMMY.ADMIN_ROLE]?.id ?? null;
    }
  }

  await prisma.user.createMany({
    data: users,
  });

  console.log("Users seeded!");
}
