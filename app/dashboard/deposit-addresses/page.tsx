import { ShieldCheck, WalletCards } from "lucide-react";
import { CopyButton, MockQrCode } from "@/components/mock-interaction-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cryptoDepositOptions, userWalletAddresses } from "@/lib/mock-data";

const expandedAddresses = [
  ...userWalletAddresses,
  {
    id: "ADDR-USDT-002",
    asset: "USDT",
    network: "Ethereum",
    address: cryptoDepositOptions.USDT.addresses.Ethereum,
    walletType: "Main Wallet",
    destinationWallet: "Treasury Main ERC20",
    riskPolicy: "Crediting review before availability",
    status: "Active"
  },
  {
    id: "ADDR-USDC-003",
    asset: "USDC",
    network: "Polygon",
    address: cryptoDepositOptions.USDC.addresses.Polygon,
    walletType: "Main Wallet",
    destinationWallet: "Treasury Main Polygon",
    riskPolicy: "Crediting review before availability",
    status: "Active"
  },
  {
    id: "ADDR-ETH-004",
    asset: "ETH",
    network: "Ethereum",
    address: cryptoDepositOptions.ETH.addresses.Ethereum,
    walletType: "Main Wallet",
    destinationWallet: "Treasury Main ERC20",
    riskPolicy: "Crediting review before availability",
    status: "Active"
  }
].map((address) => ({ ...address, riskPolicy: "Crediting review before availability" }));

export default function DepositAddressesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treasury"
        title="Deposit Address Page"
        description="Dedicated user deposit addresses for fiat-crypto gateway flows. Mock addresses only, no live chain connectivity."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <WalletCards className="mb-4 h-6 w-6 text-gold-300" />
          <p className="text-sm text-slateText-secondary"><T k="Dedicated address" /></p>
          <p className="mt-2 text-2xl font-semibold">{expandedAddresses.length}</p>
        </Card>
        <Card className="p-5">
          <ShieldCheck className="mb-4 h-6 w-6 text-emerald-400" />
          <p className="text-sm text-slateText-secondary"><T k="Status" /></p>
          <p className="mt-2 text-2xl font-semibold"><T k="Active" /></p>
        </Card>
        <Card className="p-5">
          <ShieldCheck className="mb-4 h-6 w-6 text-amber-400" />
          <p className="text-sm text-slateText-secondary"><T k="Risk Policy" /></p>
          <p className="mt-2 text-lg font-semibold"><T k="Crediting review before availability" /></p>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {expandedAddresses.map((address) => (
          <Card key={address.id} className="p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{address.asset}</p>
                <p className="text-sm text-slateText-secondary">{address.network}</p>
              </div>
              <StatusBadge value={address.status} />
            </div>
            <div className="mt-5 flex justify-center">
              <MockQrCode value={address.address} />
            </div>
            <p className="mt-4 break-all font-mono text-xs text-slateText-secondary">{address.address}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <CopyButton value={address.address} />
              <span className="rounded-full border border-gold-500/25 px-3 py-1 text-xs text-gold-300">
                <T k={address.riskPolicy} />
              </span>
            </div>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Deposit Addresses</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Address</TableHead>
                <TableHead>Risk Policy</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {expandedAddresses.map((address) => (
                <TableRow key={address.id}>
                  <TableCell className="font-medium">{address.id}</TableCell>
                  <TableCell>{address.asset}</TableCell>
                  <TableCell>{address.network}</TableCell>
                  <TableCell className="font-mono text-xs text-slateText-secondary">{address.address}</TableCell>
                  <TableCell>{address.riskPolicy}</TableCell>
                  <TableCell><StatusBadge value={address.status} /></TableCell>
                  <TableCell><CopyButton value={address.address} label="Copy" /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
