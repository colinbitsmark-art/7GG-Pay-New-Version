import { CreditCard, Link2, QrCode, ShoppingCart } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { paymentOrders } from "@/lib/mock-data";

export default function PayInPage() {
  return (
    <>
      <PageHeader
        eyebrow="Global collection"
        title="Pay-in"
        description="Mock payment order management, payment link generation, and checkout preview for global merchants."
        action={<Button><Link2 className="h-4 w-4" /> New payment link</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.1fr_0.9fr]">
        <Card>
          <CardHeader>
            <CardTitle>Payment orders</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentOrders.map((order) => (
                  <TableRow key={order.order}>
                    <TableCell className="font-medium">{order.order}</TableCell>
                    <TableCell>{order.customer}</TableCell>
                    <TableCell>{order.method}</TableCell>
                    <TableCell>{order.amount}</TableCell>
                    <TableCell><StatusBadge value={order.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Payment link generator</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input placeholder="Customer name" defaultValue="Northstar Trading" />
              <div className="grid grid-cols-2 gap-3">
                <Input placeholder="Amount" defaultValue="24880.00" />
                <Input placeholder="Currency" defaultValue="USD" />
              </div>
              <Input placeholder="Reference" defaultValue="INV-2026-511" />
              <Button className="w-full"><Link2 className="h-4 w-4" /> Generate mock link</Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>Checkout preview</CardTitle>
              <QrCode className="h-5 w-5 text-gold-300" />
            </CardHeader>
            <CardContent>
              <div className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-5">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold-500/15 text-gold-300">
                    <ShoppingCart className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="font-semibold"><T k="Merchant Checkout" /></p>
                    <p className="text-xs text-slateText-secondary"><T k="Mock hosted page" /></p>
                  </div>
                </div>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between"><span className="text-slateText-secondary"><T k="Invoice" /></span><span>INV-2026-511</span></div>
                  <div className="flex justify-between"><span className="text-slateText-secondary"><T k="Amount" /></span><span>$24,880.00</span></div>
                  <div className="flex justify-between"><span className="text-slateText-secondary"><T k="Methods" /></span><span>Card / Bank / USDT</span></div>
                </div>
                <Button className="mt-6 w-full"><CreditCard className="h-4 w-4" /> Pay now</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
