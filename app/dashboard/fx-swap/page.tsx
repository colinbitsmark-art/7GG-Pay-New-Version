import { Clock3, RefreshCcw } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { swaps } from "@/lib/mock-data";

export default function FxSwapPage() {
  return (
    <>
      <PageHeader
        eyebrow="Treasury exchange"
        title="FX Swap"
        description="Mock sell and buy panels with live rate presentation, 5-second rate lock, estimated fees, and recent swaps."
        action={<Button><RefreshCcw className="h-4 w-4" /> New swap</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr_1fr]">
        <Card>
          <CardHeader>
            <CardTitle>Sell</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input defaultValue="50,000.00" />
            <Input defaultValue="USDT" />
            <div className="rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3 text-sm text-slateText-secondary"><T k="Available" />: 2,840,500.00 USDT</div>
          </CardContent>
        </Card>
        <Card className="flex flex-col justify-center p-5 text-center">
          <RefreshCcw className="mx-auto mb-4 h-8 w-8 text-gold-300" />
          <p className="text-sm text-slateText-secondary"><T k="Live exchange rate" /></p>
          <p className="mt-2 text-3xl font-semibold">0.9990</p>
          <div className="mt-5 inline-flex items-center justify-center gap-2 rounded-full border border-amber-500/25 bg-amber-500/10 px-3 py-2 text-sm text-amber-300">
            <Clock3 className="h-4 w-4" /> <T k="5s rate lock" />
          </div>
          <p className="mt-4 text-sm text-slateText-secondary"><T k="Estimated fee: $12.50" /></p>
          <Button className="mt-5">Confirm swap</Button>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Buy</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input defaultValue="49,950.00" />
            <Input defaultValue="USD" />
            <div className="rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3 text-sm text-slateText-secondary"><T k="Settlement wallet" />: USD Operating</div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Recent swaps table</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Sell</TableHead>
                <TableHead>Buy</TableHead>
                <TableHead>Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {swaps.map((swap) => (
                <TableRow key={swap.id}>
                  <TableCell className="font-medium">{swap.id}</TableCell>
                  <TableCell>{swap.sell}</TableCell>
                  <TableCell>{swap.buy}</TableCell>
                  <TableCell>{swap.rate}</TableCell>
                  <TableCell><StatusBadge value={swap.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
