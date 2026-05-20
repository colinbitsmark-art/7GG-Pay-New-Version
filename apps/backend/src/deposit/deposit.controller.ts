import { Body, Controller, Get, Param, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { CurrentUser, JwtUser } from "../auth/decorators/current-user.decorator";
import { JwtAuthGuard } from "../auth/guards/jwt-auth.guard";
import { AmlService } from "../aml/aml.service";
import { SweepService } from "../sweep/sweep.service";
import { DepositService } from "./deposit.service";
import { CreateMockDepositDto } from "./dto/create-mock-deposit.dto";
import { ScreenDepositDto } from "./dto/screen-deposit.dto";

@ApiTags("Deposits")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("deposits")
export class DepositController {
  constructor(
    private readonly deposits: DepositService,
    private readonly aml: AmlService,
    private readonly sweep: SweepService
  ) {}

  @Post("mock")
  createMock(@CurrentUser() user: JwtUser, @Body() dto: CreateMockDepositDto) {
    return this.deposits.createMockDeposit(user.sub, dto);
  }

  @Get()
  list(@CurrentUser() user: JwtUser) {
    return this.deposits.getDeposits(user.sub);
  }

  @Get(":id")
  getOne(@CurrentUser() user: JwtUser, @Param("id") id: string) {
    return this.deposits.getDepositForUser(id, user);
  }

  @Post(":id/screen")
  async screen(@CurrentUser() user: JwtUser, @Param("id") id: string, @Body() dto: ScreenDepositDto) {
    await this.deposits.getDepositForUser(id, user);
    return this.aml.screenDeposit(id, dto);
  }

  @Post(":id/sweep")
  async sweepDeposit(@CurrentUser() user: JwtUser, @Param("id") id: string) {
    await this.deposits.getDepositForUser(id, user);
    return this.sweep.sweepDeposit(id);
  }
}
