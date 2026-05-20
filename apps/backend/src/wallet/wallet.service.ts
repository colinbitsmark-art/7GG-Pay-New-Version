import { Injectable } from "@nestjs/common";
import { ChainAsset, DepositStatus } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../prisma/prisma.service";
import { buildMockAddress, supportedChainAssets } from "./utils/mock-address";

@Injectable()
export class WalletService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly config: ConfigService
  ) {}

  async ensureWalletAddresses(userId: string) {
    const addresses = [];
    for (const chainAsset of supportedChainAssets) {
      addresses.push(
        await this.prisma.walletAddress.upsert({
          where: { userId_chainAsset: { userId, chainAsset } },
          update: {},
          create: {
            userId,
            chainAsset,
            address: buildMockAddress(userId, chainAsset)
          }
        })
      );
    }
    return addresses;
  }

  getAddresses(userId: string) {
    return this.prisma.walletAddress.findMany({
      where: { userId },
      orderBy: { chainAsset: "asc" }
    });
  }

  async getOverview(userId: string) {
    await this.ensureWalletAddresses(userId);
    const [addresses, deposits] = await Promise.all([
      this.getAddresses(userId),
      this.prisma.deposit.findMany({ where: { userId } })
    ]);

    return {
      addressCount: addresses.length,
      supportedAssets: supportedChainAssets,
      masterWallets: this.getMasterWallets(),
      depositCounts: {
        total: deposits.length,
        isolated: deposits.filter((deposit) => deposit.status === DepositStatus.ISOLATED).length,
        credited: deposits.filter((deposit) => deposit.status === DepositStatus.CREDITED).length,
        sweepPending: deposits.filter((deposit) => deposit.status === DepositStatus.SWEEP_PENDING).length
      }
    };
  }

  getMasterWallet(chainAsset: ChainAsset) {
    return this.config.get<string>(`MASTER_WALLET_${chainAsset}`) ?? `mock-master-wallet-${chainAsset.toLowerCase()}`;
  }

  private getMasterWallets() {
    return Object.fromEntries(
      supportedChainAssets.map((chainAsset) => [chainAsset, this.getMasterWallet(chainAsset)])
    );
  }
}
