import { ArrowDownToLine, ArrowUpFromLine, CreditCard, Link2, Repeat2, WalletCards } from "lucide-react";
import { AllocationChart, VolumeChart } from "@/components/charts";
import { T } from "@/components/preferences-provider";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentTransactions, tickers } from "@/lib/mock-data";

export default function DashboardOverviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Client Dashboard"
        title="Overview"
        description="Unified mock view of merchant balances, fiat and crypto movement, FX activity, and operational transactions."
        action={<Button><CreditCard className="h-4 w-4" /> Create payment link</Button>}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Balance" value="$8.42M" change="+12.4%" icon={WalletCards} />
        <KpiCard title="Fiat Balance" value="$2.59M" change="+7.1%" icon={ArrowDownToLine} tone="blue" />
        <KpiCard title="Crypto Balance" value="$5.83M" change="+18.8%" icon={ArrowUpFromLine} tone="green" />
        <KpiCard title="Monthly Volume" value="$18.2M" change="+21.3%" icon={Repeat2} />
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[1.3fr_0.7fr]">
        <Card>
          <CardHeader>
            <CardTitle>Transaction volume</CardTitle>
          </CardHeader>
          <CardContent>
            <VolumeChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Asset allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart />
            <div className="grid grid-cols-2 gap-2 text-sm">
              {["USD 42%", "USDT 24%", "HKD 14%", "BTC 11%"].map((item) => (
                <div key={item} className="rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] px-3 py-2 text-slateText-secondary">
                  {item}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
        <Card>
          <CardHeader>
            <CardTitle>Market ticker</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {tickers.map((ticker) => (
              <div key={ticker.pair} className="flex items-center justify-between rounded-xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3">
                <div>
                  <p className="font-medium">{ticker.pair}</p>
                  <p className="text-xs text-slateText-secondary"><T k="Mock reference rate" /></p>
                </div>
                <div className="text-right">
                  <p className="font-semibold">{ticker.price}</p>
                  <p className={ticker.change.startsWith("+") ? "text-xs text-emerald-300" : "text-xs text-red-300"}>{ticker.change}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent transactions</CardTitle>
            <div className="flex gap-2">
              {[
                { label: "Deposit", icon: ArrowDownToLine },
                { label: "Withdraw", icon: ArrowUpFromLine },
                { label: "Link", icon: Link2 },
                { label: "Swap", icon: Repeat2 }
              ].map(({ label, icon: Icon }) => (
                <Button key={label} variant="secondary" size="sm">
                  <Icon className="h-3.5 w-3.5" />
                  {label}
                </Button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Asset</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentTransactions.map((tx) => (
                  <TableRow key={tx.id}>
                    <TableCell className="font-medium">{tx.id}</TableCell>
                    <TableCell>{tx.type}</TableCell>
                    <TableCell>{tx.asset}</TableCell>
                    <TableCell>{tx.amount}</TableCell>
                    <TableCell><StatusBadge value={tx.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
