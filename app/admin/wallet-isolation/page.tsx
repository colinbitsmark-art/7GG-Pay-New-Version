import { ShieldAlert } from "lucide-react";
import { AdminTable, RiskScoreBadge } from "@/components/platform-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { walletIsolationEvents } from "@/lib/mock-data";

export default function WalletIsolationPage() {
  return (
    <>
      <PageHeader
        eyebrow="Admin Compliance Dashboard"
        title="Wallet Isolation Monitor"
        description="Monitor isolated wallet balances, reasons, risk scores, and release decisions."
      />

      <Card className="mb-6">
        <CardHeader><CardTitle>Wallet Risk Isolation</CardTitle></CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-3">
          {["Release to Main Wallet", "Keep isolated", "Escalate AML Case"].map((action) => (
            <div key={action} className="rounded-2xl border border-gold-500/15 bg-[color:var(--control)] p-4">
              <ShieldAlert className="mb-3 h-5 w-5 text-gold-300" />
              <p className="font-medium"><T k={action} /></p>
              <p className="mt-2 text-sm text-slateText-secondary"><T k="Mock modal / drawer action UI" /></p>
            </div>
          ))}
        </CardContent>
      </Card>

      <Card>
        <CardHeader><CardTitle>Wallet Isolation Monitor</CardTitle></CardHeader>
        <CardContent>
          <AdminTable
            columns={["ID", "Deposit", "Wallet", "Asset", "Amount", "Risk score", "Reason", "Status", "Next Action"]}
            rows={walletIsolationEvents.map((event) => [
              event.id,
              event.depositId,
              event.wallet,
              event.asset,
              event.amount,
              <RiskScoreBadge key={`${event.id}-score`} score={event.riskScore} />,
              event.reason,
              <StatusBadge key={`${event.id}-status`} value={event.status} />,
              <Button key={`${event.id}-action`} size="sm" variant="secondary">{event.nextAction}</Button>
            ])}
          />
        </CardContent>
      </Card>
    </>
  );
}
