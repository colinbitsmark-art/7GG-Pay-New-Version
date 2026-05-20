import { Controller, Get, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser, JwtUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { WalletService } from "./wallet.service";

@ApiTags("Wallet")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("wallet")
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get("addresses")
  getAddresses(@CurrentUser() user: JwtUser) {
    return this.walletService.getAddresses(user.sub);
  }

  @Get("overview")
  getOverview(@CurrentUser() user: JwtUser) {
    return this.walletService.getOverview(user.sub);
  }
}
