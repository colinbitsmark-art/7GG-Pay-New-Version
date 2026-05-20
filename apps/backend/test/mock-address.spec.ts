import { ChainAsset } from "@prisma/client";
import { buildMockAddress, supportedChainAssets } from "../src/wallet/utils/mock-address";

describe("mock wallet address generation", () => {
  it("creates one mock address format per supported chain asset", () => {
    const userId = "user_7gg_wallet_mvp";
    const addresses = supportedChainAssets.map((chainAsset) => buildMockAddress(userId, chainAsset));

    expect(addresses).toHaveLength(5);
    expect(addresses[0]).toContain("USDTTRONMOCK");
    expect(addresses[1]).toContain("USDTETH");
    expect(addresses[2]).toContain("USDCETH");
    expect(addresses[3]).toContain("btcmock");
    expect(addresses[4]).toContain("ETH");
  });

  it("never generates private key shaped data", () => {
    const address = buildMockAddress("merchant", ChainAsset.ETH);
    expect(address).not.toMatch(/^0x[a-fA-F0-9]{64}$/);
  });
});
