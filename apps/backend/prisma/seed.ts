import { PrismaClient, Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { buildMockAddress, supportedChainAssets } from "../src/wallet/utils/mock-address";

const prisma = new PrismaClient();

async function main() {
  const [adminHash, userHash] = await Promise.all([
    bcrypt.hash("Admin12345!", 10),
    bcrypt.hash("User12345!", 10)
  ]);

  const admin = await prisma.user.upsert({
    where: { email: "admin@7ggpay.local" },
    update: {},
    create: {
      email: "admin@7ggpay.local",
      passwordHash: adminHash,
      role: Role.ADMIN
    }
  });

  const user = await prisma.user.upsert({
    where: { email: "merchant@7ggpay.local" },
    update: {},
    create: {
      email: "merchant@7ggpay.local",
      passwordHash: userHash,
      role: Role.USER
    }
  });

  for (const chainAsset of supportedChainAssets) {
    await prisma.walletAddress.upsert({
      where: { userId_chainAsset: { userId: user.id, chainAsset } },
      update: {},
      create: {
        userId: user.id,
        chainAsset,
        address: buildMockAddress(user.id, chainAsset)
      }
    });
  }

  await prisma.auditLog.createMany({
    data: [
      { userId: admin.id, action: "SEED_ADMIN_CREATED", metadata: { email: admin.email } },
      { userId: user.id, action: "SEED_USER_CREATED", metadata: { email: user.email } }
    ],
    skipDuplicates: true
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
