import { ForbiddenException, Injectable, NotFoundException } from "@nestjs/common";
import { DepositStatus, Role } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { WalletService } from "../wallet/wallet.service";
import { CreateMockDepositDto } from "./dto/create-mock-deposit.dto";

@Injectable()
export class DepositService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly walletService: WalletService
  ) {}

  async createMockDeposit(userId: string, dto: CreateMockDepositDto) {
    await this.walletService.ensureWalletAddresses(userId);
    const walletAddress = await this.prisma.walletAddress.findUnique({
      where: { userId_chainAsset: { userId, chainAsset: dto.chainAsset } }
    });
    if (!walletAddress) throw new NotFoundException("Wallet address not found");

    const deposit = await this.prisma.deposit.create({
      data: {
        userId,
        walletAddressId: walletAddress.id,
        chainAsset: dto.chainAsset,
        amount: dto.amount,
        sourceAddress: dto.sourceAddress ?? `mock-source-${dto.chainAsset.toLowerCase()}`,
        txHash: dto.txHash ?? `mock-${dto.chainAsset.toLowerCase()}-${Date.now()}`
      },
      include: { walletAddress: true }
    });

    await this.prisma.auditLog.create({
      data: {
        userId,
        depositId: deposit.id,
        action: "DEPOSIT_CREATED",
        metadata: { txHash: deposit.txHash, chainAsset: deposit.chainAsset, amount: deposit.amount.toString() }
      }
    });

    return deposit;
  }

  getDeposits(userId: string) {
    return this.prisma.deposit.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
      include: { walletAddress: true, amlResult: true, sweepTxs: true }
    });
  }

  async getDepositForUser(depositId: string, user: { sub: string; role: Role }) {
    const deposit = await this.prisma.deposit.findUnique({
      where: { id: depositId },
      include: { walletAddress: true, amlResult: true, sweepTxs: true }
    });
    if (!deposit) throw new NotFoundException("Deposit not found");
    if (user.role !== Role.ADMIN && deposit.userId !== user.sub) throw new ForbiddenException("Deposit belongs to another user");
    return deposit;
  }

  async markSweepPending(depositId: string) {
    return this.prisma.deposit.update({
      where: { id: depositId },
      data: { status: DepositStatus.SWEEP_PENDING }
    });
  }
}
