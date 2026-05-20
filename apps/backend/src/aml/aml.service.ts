import { Injectable, NotFoundException } from "@nestjs/common";
import { DepositStatus, RiskLevel } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { classifyRisk, deterministicMockRiskScore, normalizeRiskScore, reasonForRisk } from "./aml-risk";

@Injectable()
export class AmlService {
  constructor(private readonly prisma: PrismaService) {}

  async screenDeposit(depositId: string, input?: { riskScore?: number; riskLevel?: RiskLevel }) {
    const deposit = await this.prisma.deposit.findUnique({ where: { id: depositId } });
    if (!deposit) throw new NotFoundException("Deposit not found");

    const riskScore = normalizeRiskScore(
      input?.riskScore ?? deterministicMockRiskScore(deposit.txHash, deposit.sourceAddress)
    );
    const riskLevel = input?.riskLevel ?? classifyRisk(riskScore);
    const status =
      riskLevel === RiskLevel.LOW
        ? DepositStatus.CLEARED
        : riskLevel === RiskLevel.HIGH
          ? DepositStatus.ISOLATED
          : DepositStatus.AML_SCREENING;

    const [result, updatedDeposit] = await this.prisma.$transaction([
      this.prisma.amlScreeningResult.upsert({
        where: { depositId },
        update: {
          riskScore,
          riskLevel,
          reason: reasonForRisk(riskLevel)
        },
        create: {
          depositId,
          riskScore,
          riskLevel,
          reason: reasonForRisk(riskLevel)
        }
      }),
      this.prisma.deposit.update({
        where: { id: depositId },
        data: { riskLevel, status }
      }),
      this.prisma.auditLog.create({
        data: {
          userId: deposit.userId,
          depositId,
          action: "AML_SCREENED",
          metadata: { riskScore, riskLevel, status }
        }
      })
    ]);

    return { result, deposit: updatedDeposit };
  }
}
