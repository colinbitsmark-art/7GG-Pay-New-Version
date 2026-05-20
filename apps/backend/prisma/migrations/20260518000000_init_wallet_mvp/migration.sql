-- CreateSchema
CREATE SCHEMA IF NOT EXISTS "public";

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('USER', 'ADMIN');

-- CreateEnum
CREATE TYPE "ChainAsset" AS ENUM ('USDT_TRON', 'USDT_ETH', 'USDC_ETH', 'BTC', 'ETH');

-- CreateEnum
CREATE TYPE "DepositStatus" AS ENUM ('DETECTED', 'AML_SCREENING', 'CLEARED', 'ISOLATED', 'SWEEP_PENDING', 'SWEPT', 'CREDITED');

-- CreateEnum
CREATE TYPE "RiskLevel" AS ENUM ('LOW', 'MEDIUM', 'HIGH');

-- CreateEnum
CREATE TYPE "SweepStatus" AS ENUM ('PENDING', 'COMPLETED', 'BLOCKED');

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "wallet_addresses" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "chainAsset" "ChainAsset" NOT NULL,
    "address" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "wallet_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "deposits" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "walletAddressId" TEXT NOT NULL,
    "chainAsset" "ChainAsset" NOT NULL,
    "txHash" TEXT NOT NULL,
    "sourceAddress" TEXT NOT NULL,
    "amount" DECIMAL(24,8) NOT NULL,
    "status" "DepositStatus" NOT NULL DEFAULT 'DETECTED',
    "riskLevel" "RiskLevel",
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "deposits_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "aml_screening_results" (
    "id" TEXT NOT NULL,
    "depositId" TEXT NOT NULL,
    "riskScore" INTEGER NOT NULL,
    "riskLevel" "RiskLevel" NOT NULL,
    "provider" TEXT NOT NULL DEFAULT '7GG_AML_MOCK',
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "aml_screening_results_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sweep_transactions" (
    "id" TEXT NOT NULL,
    "depositId" TEXT NOT NULL,
    "fromAddress" TEXT NOT NULL,
    "toAddress" TEXT NOT NULL,
    "txHash" TEXT,
    "amount" DECIMAL(24,8) NOT NULL,
    "status" "SweepStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sweep_transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "audit_logs" (
    "id" TEXT NOT NULL,
    "userId" TEXT,
    "depositId" TEXT,
    "action" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "audit_logs_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_addresses_address_key" ON "wallet_addresses"("address");

-- CreateIndex
CREATE INDEX "wallet_addresses_userId_idx" ON "wallet_addresses"("userId");

-- CreateIndex
CREATE INDEX "wallet_addresses_chainAsset_idx" ON "wallet_addresses"("chainAsset");

-- CreateIndex
CREATE UNIQUE INDEX "wallet_addresses_userId_chainAsset_key" ON "wallet_addresses"("userId", "chainAsset");

-- CreateIndex
CREATE UNIQUE INDEX "deposits_txHash_key" ON "deposits"("txHash");

-- CreateIndex
CREATE INDEX "deposits_userId_idx" ON "deposits"("userId");

-- CreateIndex
CREATE INDEX "deposits_walletAddressId_idx" ON "deposits"("walletAddressId");

-- CreateIndex
CREATE INDEX "deposits_status_idx" ON "deposits"("status");

-- CreateIndex
CREATE INDEX "deposits_riskLevel_idx" ON "deposits"("riskLevel");

-- CreateIndex
CREATE INDEX "deposits_chainAsset_idx" ON "deposits"("chainAsset");

-- CreateIndex
CREATE UNIQUE INDEX "aml_screening_results_depositId_key" ON "aml_screening_results"("depositId");

-- CreateIndex
CREATE INDEX "aml_screening_results_riskLevel_idx" ON "aml_screening_results"("riskLevel");

-- CreateIndex
CREATE INDEX "sweep_transactions_depositId_idx" ON "sweep_transactions"("depositId");

-- CreateIndex
CREATE INDEX "sweep_transactions_status_idx" ON "sweep_transactions"("status");

-- CreateIndex
CREATE INDEX "audit_logs_userId_idx" ON "audit_logs"("userId");

-- CreateIndex
CREATE INDEX "audit_logs_depositId_idx" ON "audit_logs"("depositId");

-- CreateIndex
CREATE INDEX "audit_logs_action_idx" ON "audit_logs"("action");

-- AddForeignKey
ALTER TABLE "wallet_addresses" ADD CONSTRAINT "wallet_addresses_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "deposits" ADD CONSTRAINT "deposits_walletAddressId_fkey" FOREIGN KEY ("walletAddressId") REFERENCES "wallet_addresses"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "aml_screening_results" ADD CONSTRAINT "aml_screening_results_depositId_fkey" FOREIGN KEY ("depositId") REFERENCES "deposits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "sweep_transactions" ADD CONSTRAINT "sweep_transactions_depositId_fkey" FOREIGN KEY ("depositId") REFERENCES "deposits"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "audit_logs" ADD CONSTRAINT "audit_logs_depositId_fkey" FOREIGN KEY ("depositId") REFERENCES "deposits"("id") ON DELETE SET NULL ON UPDATE CASCADE;

