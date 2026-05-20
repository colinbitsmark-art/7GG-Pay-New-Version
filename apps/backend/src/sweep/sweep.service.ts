import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { DepositStatus, RiskLevel, SweepStatus } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { WalletService } from "../wallet/wallet.service";

@Injectable()
export class SweepService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly wallet: WalletService
  ) {}

  async sweepDeposit(depositId: string) {
    const deposit = await this.prisma.deposit.findUnique({
      where: { id: depositId },
      include: { walletAddress: true, amlResult: true }
    });
    if (!deposit) throw new NotFoundException("Deposit not found");
    if (!deposit.amlResult) throw new BadRequestException("Deposit must be AML screened before sweep");

    const masterWallet = this.wallet.getMasterWallet(deposit.chainAsset);

    if (deposit.riskLevel === RiskLevel.HIGH || deposit.status === DepositStatus.ISOLATED) {
      const blocked = await this.prisma.sweepTransaction.create({
        data: {
          depositId: deposit.id,
          fromAddress: deposit.walletAddress.address,
          toAddress: masterWallet,
          amount: deposit.amount,
          status: SweepStatus.BLOCKED
        }
      });
      await this.prisma.auditLog.create({
        data: {
          userId: deposit.userId,
          depositId: deposit.id,
          action: "SWEEP_BLOCKED",
          metadata: { reason: "High-risk deposits cannot be swept", riskLevel: deposit.riskLevel }
        }
      });
      throw new BadRequestException({
        message: "High-risk deposits cannot be swept",
        sweep: blocked
      });
    }

    if (deposit.riskLevel !== RiskLevel.LOW || deposit.status !== DepositStatus.CLEARED) {
      throw new BadRequestException("Only low-risk cleared deposits can be swept");
    }

    const [sweep] = await this.prisma.$transaction([
      this.prisma.sweepTransaction.create({
        data: {
          depositId: deposit.id,
          fromAddress: deposit.walletAddress.address,
          toAddress: masterWallet,
          amount: deposit.amount,
          status: SweepStatus.COMPLETED,
          txHash: `mock-sweep-${deposit.id}-${Date.now()}`
        }
      }),
      this.prisma.deposit.update({
        where: { id: deposit.id },
        data: { status: DepositStatus.CREDITED }
      }),
      this.prisma.auditLog.create({
        data: {
          userId: deposit.userId,
          depositId: deposit.id,
          action: "SWEEP_COMPLETED",
          metadata: { masterWallet, amount: deposit.amount.toString() }
        }
      })
    ]);

    return {
      depositId: deposit.id,
      status: DepositStatus.CREDITED,
      sweep
    };
  }
}
