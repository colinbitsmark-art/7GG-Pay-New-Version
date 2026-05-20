import { ChainAsset } from "@prisma/client";

export const supportedChainAssets: ChainAsset[] = [
  ChainAsset.USDT_TRON,
  ChainAsset.USDT_ETH,
  ChainAsset.USDC_ETH,
  ChainAsset.BTC,
  ChainAsset.ETH
];

export function buildMockAddress(userId: string, chainAsset: ChainAsset) {
  const suffix = userId.replace(/[^a-zA-Z0-9]/g, "").slice(-12).padStart(12, "0");

  switch (chainAsset) {
    case ChainAsset.USDT_TRON:
      return `T7GG${suffix}USDTTRONMOCK`;
    case ChainAsset.USDT_ETH:
      return `0x7GG${suffix}USDTETH0000000000`;
    case ChainAsset.USDC_ETH:
      return `0x7GG${suffix}USDCETH0000000000`;
    case ChainAsset.BTC:
      return `bc1q7gg${suffix.toLowerCase()}btcmock`;
    case ChainAsset.ETH:
      return `0x7GG${suffix}ETH000000000000`;
    default:
      return `7GG${suffix}MOCK`;
  }
}
