import { ApiProperty } from "@nestjs/swagger";

export class WalletOverviewDto {
  @ApiProperty()
  addressCount!: number;
}
