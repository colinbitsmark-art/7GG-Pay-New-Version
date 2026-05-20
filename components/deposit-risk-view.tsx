import { AlertTriangle, CheckCircle2, ShieldAlert } from "lucide-react";
import { RiskScoreBadge } from "@/components/platform-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { amlScreenings, deposits, mockRiskDeposits } from "@/lib/mock-data";

export function DepositRiskView() {
  const isolated = mockRiskDeposits.filter((deposit) => deposit.action === "Isolated").length;
  const cleared = mockRiskDeposits.filter((deposit) => deposit.action === "Cleared").length;

  return (
    <>
      <PageHeader
        eyebrow="Compliance Review"
        title="Deposit Risk Status"
        description="AML screening, wallet routing, credit status, and isolation outcomes for merchant deposits."
      />

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="p-5">
          <CheckCircle2 className="mb-4 h-6 w-6 text-emerald-400" />
          <p className="text-sm text-slateText-secondary"><T k="Low risk deposit" /></p>
          <p className="mt-2 text-2xl font-semibold">{cleared}</p>
          <p className="mt-2 text-xs text-slateText-secondary"><T k="Low risk deposits are swept into the main wallet and credited automatically." /></p>
        </Card>
        <Card className="p-5">
          <ShieldAlert className="mb-4 h-6 w-6 text-amber-400" />
          <p className="text-sm text-slateText-secondary"><T k="Medium risk deposit" /></p>
          <p className="mt-2 text-2xl font-semibold">1</p>
          <p className="mt-2 text-xs text-slateText-secondary"><T k="Compliance Review" /></p>
        </Card>
        <Card className="p-5">
          <AlertTriangle className="mb-4 h-6 w-6 text-red-400" />
          <p className="text-sm text-slateText-secondary"><T k="High risk isolated deposit" /></p>
          <p className="mt-2 text-2xl font-semibold">{isolated}</p>
          <p className="mt-2 text-xs text-slateText-secondary"><T k="High risk deposits remain isolated until compliance review clears them." /></p>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Mock risk deposits</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source address</TableHead>
                <TableHead>Risk score</TableHead>
                <TableHead>Risk label</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {mockRiskDeposits.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{deposit.id}</TableCell>
                  <TableCell>{deposit.asset}</TableCell>
                  <TableCell>{deposit.amount}</TableCell>
                  <TableCell className="font-mono text-xs text-slateText-secondary">{deposit.sourceAddress}</TableCell>
                  <TableCell><RiskScoreBadge score={deposit.riskScore} /></TableCell>
                  <TableCell><StatusBadge value={deposit.riskLabel} /></TableCell>
                  <TableCell><StatusBadge value={deposit.action} /></TableCell>
                  <TableCell><StatusBadge value={deposit.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle>Deposit risk table</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Network</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source Wallet</TableHead>
                <TableHead>Risk score</TableHead>
                <TableHead>AML Status</TableHead>
                <TableHead>Wallet Status</TableHead>
                <TableHead>Credit Status</TableHead>
                <TableHead>Received At</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {deposits.map((deposit) => (
                <TableRow key={deposit.id}>
                  <TableCell className="font-medium">{deposit.id}</TableCell>
                  <TableCell>{deposit.asset}</TableCell>
                  <TableCell>{deposit.network}</TableCell>
                  <TableCell>{deposit.amount}</TableCell>
                  <TableCell className="font-mono text-xs text-slateText-secondary">{deposit.source}</TableCell>
                  <TableCell><RiskScoreBadge score={deposit.riskScore} /></TableCell>
                  <TableCell><StatusBadge value={deposit.amlStatus} /></TableCell>
                  <TableCell><StatusBadge value={deposit.walletStatus} /></TableCell>
                  <TableCell><StatusBadge value={deposit.creditStatus} /></TableCell>
                  <TableCell className="text-slateText-secondary">{deposit.receivedAt}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader><CardTitle>AML screening table</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Deposit</TableHead>
                <TableHead>Provider</TableHead>
                <TableHead>Result</TableHead>
                <TableHead>Risk score</TableHead>
                <TableHead>Matched Category</TableHead>
                <TableHead>Analyst</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {amlScreenings.map((screening) => (
                <TableRow key={screening.id}>
                  <TableCell className="font-medium">{screening.id}</TableCell>
                  <TableCell>{screening.depositId}</TableCell>
                  <TableCell>{screening.provider}</TableCell>
                  <TableCell><StatusBadge value={screening.result} /></TableCell>
                  <TableCell><RiskScoreBadge score={screening.riskScore} /></TableCell>
                  <TableCell>{screening.matchedCategory}</TableCell>
                  <TableCell>{screening.analyst}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
