import { ApiProperty } from "@nestjs/swagger";
import { RiskLevel } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, Max, Min } from "class-validator";

export class ScreenDepositDto {
  @ApiProperty({ example: 18, required: false, minimum: 0, maximum: 100 })
  @IsOptional()
  @IsInt()
  @Min(0)
  @Max(100)
  riskScore?: number;

  @ApiProperty({ enum: RiskLevel, required: false })
  @IsOptional()
  @IsEnum(RiskLevel)
  riskLevel?: RiskLevel;
}
