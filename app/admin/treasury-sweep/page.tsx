import { WalletCards } from "lucide-react";
import { AdminTable } from "@/components/platform-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { sweepTransactions } from "@/lib/mock-data";

export default function TreasurySweepPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treasury"
        title="Treasury Sweep Monitor"
        description="Monitor treasury sweep queue from dedicated user addresses to main or isolation wallets."
      />

      <div className="grid gap-4 md:grid-cols-3">
        {["Main Wallet", "Isolation Wallet", "Queued Sweeps"].map((item) => (
          <Card key={item} className="p-5">
            <WalletCards className="mb-4 h-6 w-6 text-gold-300" />
            <p className="text-sm text-slateText-secondary"><T k={item} /></p>
            <p className="mt-2 text-2xl font-semibold">{item === "Queued Sweeps" ? "1" : "$2.8M"}</p>
          </Card>
        ))}
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Treasury sweep queue</CardTitle></CardHeader>
        <CardContent>
          <AdminTable
            columns={["ID", "Deposit", "Asset", "From", "To", "Amount", "Status", "ETA", "Fee", "Action"]}
            rows={sweepTransactions.map((sweep) => [
              sweep.id,
              sweep.depositId,
              sweep.asset,
              sweep.from,
              sweep.to,
              sweep.amount,
              <StatusBadge key={`${sweep.id}-status`} value={sweep.status} />,
              sweep.eta,
              sweep.fee,
              <Button key={`${sweep.id}-action`} size="sm" variant="secondary">Review</Button>
            ])}
          />
        </CardContent>
      </Card>
    </>
  );
}
