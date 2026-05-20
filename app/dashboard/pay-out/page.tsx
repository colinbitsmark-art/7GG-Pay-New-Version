import { CloudUpload, Route, Send } from "lucide-react";
import Link from "next/link";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { payouts } from "@/lib/mock-data";

export default function PayOutPage() {
  return (
    <>
      <PageHeader
        eyebrow="Global disbursement"
        title="Pay-out"
        description="Single payout, batch upload, smart routing recommendations, and recent payout states using mock data."
        action={<Button asChild><Link href="/dashboard/pay-out/create"><Send className="h-4 w-4" /> Create payout</Link></Button>}
      />

      <div className="grid gap-5 xl:grid-cols-3">
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Single payout</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input defaultValue="Apex Logistics" placeholder="Beneficiary" />
            <Input defaultValue="42,000.00" placeholder="Amount" />
            <Input defaultValue="USD" placeholder="Currency" />
            <Input defaultValue="SWIFT" placeholder="Rail" />
            <Button className="w-full"><Send className="h-4 w-4" /> Review mock payout</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Batch upload</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex min-h-52 flex-col items-center justify-center rounded-2xl border border-dashed border-gold-500/25 bg-[color:var(--control)] text-center">
              <CloudUpload className="mb-4 h-8 w-8 text-gold-300" />
              <p className="font-medium"><T k="CSV batch payout" /></p>
              <p className="mt-2 max-w-xs text-sm text-slateText-secondary"><T k="Mock upload surface for treasury and finance teams." /></p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Smart routing recommendation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4">
              <Route className="mb-4 h-6 w-6 text-gold-300" />
              <p className="font-semibold"><T k="Use local rail for HKD payout" /></p>
              <p className="mt-2 text-sm leading-6 text-slateText-secondary"><T k="Estimated arrival instant, lower mock fee by 62 bps versus SWIFT." /></p>
              <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
                <div className="rounded-xl bg-[color:var(--control)] p-3"><p className="text-slateText-secondary"><T k="Fee" /></p><p className="font-semibold">0.18%</p></div>
                <div className="rounded-xl bg-[color:var(--control)] p-3"><p className="text-slateText-secondary"><T k="ETA" /></p><p className="font-semibold"><T k="Instant" /></p></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent payout table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Beneficiary</TableHead>
                <TableHead>Rail</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>ETA</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {payouts.map((payout) => (
                <TableRow key={payout.beneficiary}>
                  <TableCell className="font-medium">{payout.beneficiary}</TableCell>
                  <TableCell>{payout.rail}</TableCell>
                  <TableCell>{payout.amount}</TableCell>
                  <TableCell><StatusBadge value={payout.status} /></TableCell>
                  <TableCell className="text-slateText-secondary">{payout.eta}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
