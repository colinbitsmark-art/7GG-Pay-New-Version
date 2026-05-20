import { RiskLevel } from "@prisma/client";
import { classifyRisk, normalizeRiskScore } from "../src/aml/aml-risk";

describe("AML risk helpers", () => {
  it("classifies low, medium, and high scores", () => {
    expect(classifyRisk(18)).toBe(RiskLevel.LOW);
    expect(classifyRisk(58)).toBe(RiskLevel.MEDIUM);
    expect(classifyRisk(87)).toBe(RiskLevel.HIGH);
  });

  it("normalizes scores into the 0-100 range", () => {
    expect(normalizeRiskScore(-20)).toBe(0);
    expect(normalizeRiskScore(44.6)).toBe(45);
    expect(normalizeRiskScore(140)).toBe(100);
  });
});
