import { KeyRound, Plus, Webhook } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { apiKeys } from "@/lib/mock-data";

export default function ApiKeysPage() {
  return (
    <>
      <PageHeader
        eyebrow="Developers"
        title="API Keys"
        description="API key inventory, webhook URL, sandbox toggle, and mock developer operations."
        action={<Button><Plus className="h-4 w-4" /> Create key</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>API key list</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Prefix</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Scope</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {apiKeys.map((key) => (
                  <TableRow key={key.prefix}>
                    <TableCell className="font-medium"><KeyRound className="mr-2 inline h-4 w-4 text-gold-300" />{key.name}</TableCell>
                    <TableCell>{key.prefix}••••</TableCell>
                    <TableCell className="text-slateText-secondary">{key.created}</TableCell>
                    <TableCell>{key.scope}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <div className="grid gap-5">
          <Card>
            <CardHeader>
              <CardTitle>Webhook URL</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-4">
                <Webhook className="h-5 w-5 text-gold-300" />
                <span className="text-sm text-slateText-secondary">https://merchant.example/webhooks/7gg</span>
              </div>
              <Input defaultValue="payment.succeeded, payout.sent, swap.completed" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Sandbox toggle</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <div>
                <p className="font-medium"><T k="Sandbox environment" /></p>
                <p className="text-sm text-slateText-secondary"><T k="Mock API mode enabled" /></p>
              </div>
              <Switch checked />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
