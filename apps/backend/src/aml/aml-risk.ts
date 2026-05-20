import { RiskLevel } from "@prisma/client";

export function normalizeRiskScore(score: number) {
  return Math.max(0, Math.min(100, Math.round(score)));
}

export function classifyRisk(score: number): RiskLevel {
  const normalized = normalizeRiskScore(score);
  if (normalized >= 75) return RiskLevel.HIGH;
  if (normalized >= 40) return RiskLevel.MEDIUM;
  return RiskLevel.LOW;
}

export function deterministicMockRiskScore(txHash: string, sourceAddress: string) {
  const input = `${txHash}:${sourceAddress}`;
  let hash = 0;
  for (const char of input) {
    hash = (hash * 31 + char.charCodeAt(0)) % 101;
  }
  return normalizeRiskScore(hash);
}

export function reasonForRisk(level: RiskLevel) {
  if (level === RiskLevel.HIGH) return "High-risk wallet exposure detected by mock AML rules";
  if (level === RiskLevel.MEDIUM) return "Medium-risk counterparty requires manual review";
  return "Low-risk mock screening result";
}
