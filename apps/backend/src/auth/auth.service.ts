import { ConflictException, Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import * as bcrypt from "bcryptjs";
import { PrismaService } from "../prisma/prisma.service";
import { WalletService } from "../wallet/wallet.service";
import { LoginDto } from "./dto/login.dto";
import { RegisterDto } from "./dto/register.dto";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly walletService: WalletService,
    private readonly config: ConfigService
  ) {}

  async register(dto: RegisterDto) {
    const existing = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (existing) throw new ConflictException("Email already registered");

    const passwordHash = await bcrypt.hash(dto.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwordHash,
        role: dto.role ?? Role.USER
      },
      select: { id: true, email: true, role: true, createdAt: true }
    });

    await this.walletService.ensureWalletAddresses(user.id);
    await this.prisma.auditLog.create({
      data: { userId: user.id, action: "USER_REGISTERED", metadata: { email: user.email, role: user.role } }
    });

    return {
      user,
      accessToken: await this.signToken(user)
    };
  }

  async login(dto: LoginDto) {
    const user = await this.prisma.user.findUnique({ where: { email: dto.email } });
    if (!user) throw new UnauthorizedException("Invalid credentials");

    const ok = await bcrypt.compare(dto.password, user.passwordHash);
    if (!ok) throw new UnauthorizedException("Invalid credentials");

    await this.prisma.auditLog.create({
      data: { userId: user.id, action: "LOGIN", metadata: { email: user.email } }
    });

    return {
      user: { id: user.id, email: user.email, role: user.role, createdAt: user.createdAt },
      accessToken: await this.signToken(user)
    };
  }

  private signToken(user: { id: string; email: string; role: Role }) {
    return this.jwtService.signAsync(
      { sub: user.id, email: user.email, role: user.role },
      { expiresIn: this.config.get<string>("JWT_EXPIRES_IN") ?? "1d" }
    );
  }
}
