const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

async function main() {
  const password = await bcrypt.hash("12345678", 12);
  await prisma.$transaction(async (tx) => {
    await tx.user.create({
      data: {
        name: "admin",
        email: "no69station@gmail.com",
        password,
        isHashedPassword: true,
      },
    });
  });
}
main()
  .then(() => prisma.$disconnect())
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
