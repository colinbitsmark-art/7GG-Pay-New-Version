import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AdminModule } from "./admin/admin.module";
import { AmlModule } from "./aml/aml.module";
import { AuthModule } from "./auth/auth.module";
import { DepositModule } from "./deposit/deposit.module";
import { PrismaModule } from "./prisma/prisma.module";
import { SweepModule } from "./sweep/sweep.module";
import { WalletModule } from "./wallet/wallet.module";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    WalletModule,
    AuthModule,
    AmlModule,
    SweepModule,
    DepositModule,
    AdminModule
  ]
})
export class AppModule {}
