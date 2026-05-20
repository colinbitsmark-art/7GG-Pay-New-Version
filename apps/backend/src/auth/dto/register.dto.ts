import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEnum, IsOptional, IsString, MinLength } from "class-validator";
import { Role } from "@prisma/client";

export class RegisterDto {
  @ApiProperty({ example: "merchant@example.com" })
  @IsEmail()
  email!: string;

  @ApiProperty({ example: "User12345!" })
  @IsString()
  @MinLength(8)
  password!: string;

  @ApiProperty({ enum: Role, required: false, default: Role.USER })
  @IsOptional()
  @IsEnum(Role)
  role?: Role;
}
