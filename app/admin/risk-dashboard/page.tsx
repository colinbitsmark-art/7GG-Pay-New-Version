import { AlertTriangle, ShieldAlert, WalletCards } from "lucide-react";
import { AdminTable, RiskBadge, RiskScoreBadge } from "@/components/platform-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { amlScreenings, complianceCases, deposits, sweepTransactions } from "@/lib/mock-data";

export default function AdminRiskDashboardPage() {
  const isolated = deposits.filter((deposit) => deposit.walletStatus === "Isolated").length;
  const highRisk = amlScreenings.filter((screening) => screening.riskScore >= 80).length;
  const queued = sweepTransactions.filter((sweep) => sweep.status === "Queued").length;

  return (
    <>
      <PageHeader
        eyebrow="Admin Compliance Dashboard"
        title="Admin Risk Dashboard"
        description="Risk dashboard for AML screening hits, isolated deposits, compliance queues, and sweep state."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <AlertTriangle className="mb-4 h-6 w-6 text-red-400" />
          <p className="text-sm text-slateText-secondary"><T k="AML High Risk Hits" /></p>
          <p className="mt-2 text-2xl font-semibold">{highRisk}</p>
        </Card>
        <Card className="p-5">
          <ShieldAlert className="mb-4 h-6 w-6 text-amber-400" />
          <p className="text-sm text-slateText-secondary"><T k="Isolated Deposits" /></p>
          <p className="mt-2 text-2xl font-semibold">{isolated}</p>
        </Card>
        <Card className="p-5">
          <WalletCards className="mb-4 h-6 w-6 text-gold-300" />
          <p className="text-sm text-slateText-secondary"><T k="Queued Sweeps" /></p>
          <p className="mt-2 text-2xl font-semibold">{queued}</p>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>AML screening table</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["ID", "Deposit", "Result", "Risk score", "Matched Category", "Analyst"]}
              rows={amlScreenings.map((screening) => [
                screening.id,
                screening.depositId,
                <StatusBadge key={`${screening.id}-status`} value={screening.result} />,
                <RiskScoreBadge key={`${screening.id}-score`} score={screening.riskScore} />,
                screening.matchedCategory,
                screening.analyst
              ])}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Compliance case queue</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["Compliance Case ID", "Account Name", "Type", "Risk Level", "Status", "SLA"]}
              rows={complianceCases.map((item) => [
                item.caseId,
                item.account,
                item.type,
                <RiskBadge key={`${item.caseId}-risk`} level={item.risk} />,
                <StatusBadge key={`${item.caseId}-status`} value={item.status} />,
                item.sla
              ])}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
