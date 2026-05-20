import { Module } from "@nestjs/common";
import { WalletModule } from "../wallet/wallet.module";
import { SweepService } from "./sweep.service";

@Module({
  imports: [WalletModule],
  providers: [SweepService],
  exports: [SweepService]
})
export class SweepModule {}
