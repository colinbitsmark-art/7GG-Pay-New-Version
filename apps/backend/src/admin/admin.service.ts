import { Injectable } from "@nestjs/common";
import { DepositStatus, RiskLevel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  getWalletIsolation() {
    return this.prisma.deposit.findMany({
      where: { status: DepositStatus.ISOLATED },
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { id: true, email: true, role: true } },
        walletAddress: true,
        amlResult: true,
        sweepTxs: true
      }
    });
  }

  getRiskDeposits() {
    return this.prisma.deposit.findMany({
      where: {
        OR: [
          { riskLevel: RiskLevel.HIGH },
          { riskLevel: RiskLevel.MEDIUM },
          { status: DepositStatus.ISOLATED },
          { status: DepositStatus.AML_SCREENING }
        ]
      },
      orderBy: { updatedAt: "desc" },
      include: {
        user: { select: { id: true, email: true, role: true } },
        walletAddress: true,
        amlResult: true,
        sweepTxs: true
      }
    });
  }
}
