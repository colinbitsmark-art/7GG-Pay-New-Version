import { Filter, ShieldAlert } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { suspiciousTransactions } from "@/lib/mock-data";

export default function TransactionMonitoringPage() {
  return (
    <>
      <PageHeader
        eyebrow="Risk operations"
        title="Transaction Monitoring"
        description="Suspicious transaction table, risk score badges, timeline, and filter controls for mock compliance monitoring."
      />

      <Card>
        <CardHeader><CardTitle>Filter controls</CardTitle></CardHeader>
        <CardContent className="grid gap-3 md:grid-cols-4">
          <Input defaultValue="Risk score > 50" />
          <Input defaultValue="All rails" />
          <Input defaultValue="Last 7 days" />
          <Button variant="secondary"><Filter className="h-4 w-4" /> Apply</Button>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader><CardTitle>Suspicious transactions table</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Route</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Risk score</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {suspiciousTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.customer}</TableCell>
                    <TableCell>{tx.route}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell><StatusBadge value={tx.score > 80 ? "High" : tx.score > 60 ? "Medium" : "Low"} /></TableCell>
                    <TableCell><StatusBadge value={tx.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Transaction timeline</CardTitle>
            <ShieldAlert className="h-5 w-5 text-red-300" />
          </CardHeader>
          <CardContent className="space-y-4">
            {["Order created", "Velocity rule triggered", "Analyst review opened", "Payout blocked"].map((event, index) => (
              <div key={event} className="flex gap-3">
                <span className="mt-1 h-3 w-3 rounded-full bg-gold-500 shadow-gold" />
                <div>
                  <p className="font-medium"><T k={event} /></p>
                  <p className="text-sm text-slateText-secondary">{17 - index} May 2026, 14:{20 + index * 7}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
