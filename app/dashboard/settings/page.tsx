import { LockKeyhole, ShieldCheck, UserPlus } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { teamMembers } from "@/lib/mock-data";

export default function SettingsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Workspace"
        title="Settings"
        description="Business profile, KYB state, team members, security controls, 2FA, and password UI with mock data."
        action={<Button><UserPlus className="h-4 w-4" /> Invite member</Button>}
      />

      <div className="grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>Business Profile Card</CardTitle></CardHeader>
          <CardContent className="grid gap-3">
            <Input defaultValue="Global Merchant Holdings Ltd" />
            <Input defaultValue="Cross-border ecommerce / Web3 commerce" />
            <Input defaultValue="Hong Kong" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>KYC / KYB Status</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4">
              <div className="flex items-center gap-3">
                <ShieldCheck className="h-6 w-6 text-emerald-300" />
                <div>
                  <p className="font-semibold"><T k="Verified business" /></p>
                  <p className="text-sm text-slateText-secondary"><T k="Annual refresh due 02 Nov 2026" /></p>
                </div>
              </div>
              <StatusBadge value="Approved" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader><CardTitle>Team Members Table</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow key={member.email}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell className="text-slateText-secondary">{member.email}</TableCell>
                  <TableCell><StatusBadge value={member.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>Security Settings</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between"><span><T k="Withdrawal approvals" /></span><Switch checked /></div>
            <div className="flex items-center justify-between"><span><T k="IP allowlist" /></span><Switch /></div>
            <div className="flex items-center justify-between"><span><T k="Webhook signing" /></span><Switch checked /></div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>2FA UI</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4">
              <div className="flex items-center gap-3">
                <LockKeyhole className="h-5 w-5 text-gold-300" />
                <span><T k="Authenticator enabled" /></span>
              </div>
              <Switch checked />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Password Change UI</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <Input type="password" defaultValue="current-password" />
            <Input type="password" defaultValue="new-password" />
            <Button variant="secondary" className="w-full">Update password</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
