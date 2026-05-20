import { ApiProperty } from "@nestjs/swagger";
import { ChainAsset } from "@prisma/client";
import { IsEnum, IsNumberString, IsOptional, IsString } from "class-validator";

export class CreateMockDepositDto {
  @ApiProperty({ enum: ChainAsset, example: ChainAsset.USDT_TRON })
  @IsEnum(ChainAsset)
  chainAsset!: ChainAsset;

  @ApiProperty({ example: "1200.50000000" })
  @IsNumberString()
  amount!: string;

  @ApiProperty({ example: "TMockSourceWallet0001", required: false })
  @IsOptional()
  @IsString()
  sourceAddress?: string;

  @ApiProperty({ example: "mock-tx-low-risk-001", required: false })
  @IsOptional()
  @IsString()
  txHash?: string;
}
