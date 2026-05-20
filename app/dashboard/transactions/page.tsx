import { Download, Filter, Search } from "lucide-react";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { recentTransactions } from "@/lib/mock-data";

export default function TransactionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reporting"
        title="Transactions"
        description="Advanced filters, compact transaction table, and mock statement export for merchant operations."
        action={<Button><Download className="h-4 w-4" /> Export statement</Button>}
      />
      <Card>
        <CardHeader>
          <CardTitle>Advanced filter bar</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 md:grid-cols-5">
            <div className="relative md:col-span-2">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slateText-secondary" />
              <Input className="pl-9" placeholder="Search by ID, asset, customer" />
            </div>
            <Input defaultValue="All statuses" />
            <Input defaultValue="All assets" />
            <Button variant="secondary"><Filter className="h-4 w-4" /> Apply filters</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Transaction table</CardTitle>
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
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {recentTransactions.concat(recentTransactions.slice(0, 2)).map((tx, index) => (
                <TableRow key={`${tx.id}-${index}`}>
                  <TableCell className="font-medium">{tx.id}</TableCell>
                  <TableCell>{tx.type}</TableCell>
                  <TableCell>{tx.asset}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell><StatusBadge value={tx.status} /></TableCell>
                  <TableCell className="text-slateText-secondary">{tx.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
