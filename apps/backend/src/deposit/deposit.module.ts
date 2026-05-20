import { Module } from "@nestjs/common";
import { AmlModule } from "../aml/aml.module";
import { SweepModule } from "../sweep/sweep.module";
import { WalletModule } from "../wallet/wallet.module";
import { DepositController } from "./deposit.controller";
import { DepositService } from "./deposit.service";

@Module({
  imports: [AmlModule, SweepModule, WalletModule],
  controllers: [DepositController],
  providers: [DepositService],
  exports: [DepositService]
})
export class DepositModule {}
