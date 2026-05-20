import { FileText } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { auditLogs } from "@/lib/mock-data";

export default function AuditLogsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Staff Admin Portal"
        title="Audit Logs"
        description="Internal audit trail for compliance actions, wallet isolation reviews, risk labels, and treasury operations."
      />

      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Actor</TableHead>
                <TableHead>Action</TableHead>
                <TableHead>Target</TableHead>
                <TableHead>Time</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {auditLogs.map((log) => (
                <TableRow key={log.id}>
                  <TableCell className="font-medium">{log.id}</TableCell>
                  <TableCell>{log.actor}</TableCell>
                  <TableCell className="flex items-center gap-2"><FileText className="h-4 w-4 text-gold-300" /><T k={log.action} /></TableCell>
                  <TableCell>{log.target}</TableCell>
                  <TableCell className="text-slateText-secondary">{log.time}</TableCell>
                  <TableCell><StatusBadge value={log.status} /></TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </>
  );
}
