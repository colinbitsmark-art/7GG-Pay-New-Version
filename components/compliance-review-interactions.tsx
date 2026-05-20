"use client";

import { useState } from "react";
import { FileSearch, ShieldAlert } from "lucide-react";
import { AuditTimeline, RiskBadge } from "@/components/platform-components";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { complianceCases, isolatedReviewItems } from "@/lib/mock-data";

type ReviewStatus = Record<string, string>;

export function ComplianceReviewInteractions() {
  const [statuses, setStatuses] = useState<ReviewStatus>({});

  const setAction = (id: string, status: string) => {
    setStatuses((current) => ({ ...current, [id]: status }));
  };

  return (
    <>
      <PageHeader
        eyebrow="Compliance Review"
        title="Compliance Review Status"
        description="Open compliance cases linked to deposits, AML screening, and isolated wallet flows."
        action={<Button><FileSearch className="h-4 w-4" /> <T k="View deposit addresses" /></Button>}
      />

      <Card className="mb-6">
        <CardHeader><CardTitle>Isolated high-risk deposits</CardTitle></CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Asset</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Source address</TableHead>
                <TableHead>Risk reason</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isolatedReviewItems.map((item) => {
                const status = statuses[item.id] ?? item.status;
                return (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.user}</TableCell>
                    <TableCell>{item.asset}</TableCell>
                    <TableCell>{item.amount}</TableCell>
                    <TableCell className="font-mono text-xs text-slateText-secondary">{item.sourceAddress}</TableCell>
                    <TableCell>{item.riskReason}</TableCell>
                    <TableCell><StatusBadge value={status} /></TableCell>
                    <TableCell>
                      <div className="flex flex-wrap gap-2">
                        <Button size="sm" onClick={() => setAction(item.id, "Approved")}>Approve</Button>
                        <Button size="sm" variant="danger" onClick={() => setAction(item.id, "Rejected")}>Reject</Button>
                        <Button size="sm" variant="secondary" onClick={() => setAction(item.id, "Keep Isolated")}>Keep Isolated</Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <div className="grid gap-5 xl:grid-cols-[1.25fr_0.75fr]">
        <Card>
          <CardHeader><CardTitle>Compliance case queue</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Compliance Case ID</TableHead>
                  <TableHead>Deposit</TableHead>
                  <TableHead>Account Name</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Risk Level</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reviewer</TableHead>
                  <TableHead>SLA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {complianceCases.map((item) => (
                  <TableRow key={item.caseId}>
                    <TableCell className="font-medium">{item.caseId}</TableCell>
                    <TableCell>{item.depositId}</TableCell>
                    <TableCell>{item.account}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell><RiskBadge level={item.risk} /></TableCell>
                    <TableCell><StatusBadge value={item.status} /></TableCell>
                    <TableCell>{item.reviewer}</TableCell>
                    <TableCell className="text-slateText-secondary">{item.sla}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Wallet Risk Isolation</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="mb-5 rounded-2xl border border-gold-500/15 bg-[color:var(--control)] p-4">
              <ShieldAlert className="mb-3 h-6 w-6 text-gold-300" />
              <p className="text-sm leading-6 text-slateText-secondary">
                <T k="Main wallet accepts cleared funds only. Isolation wallet protects merchant balance from high-risk deposits." />
              </p>
            </div>
            <AuditTimeline events={["Deposit Detected", "AML Screening", "Funds Isolated", "Compliance Review Required"]} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
