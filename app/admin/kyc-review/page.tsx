import { CheckCircle2, FileSearch, MessageSquareMore, XCircle } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { applicants } from "@/lib/mock-data";

export default function KycReviewPage() {
  return (
    <>
      <PageHeader
        eyebrow="Compliance operations"
        title="KYC Review"
        description="Applicant review table, risk badges, document preview panel, and reviewer actions using mock data only."
      />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader><CardTitle>Applicant table</CardTitle></CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Applicant</TableHead>
                  <TableHead>Country</TableHead>
                  <TableHead>Submitted</TableHead>
                  <TableHead>Risk</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {applicants.map((applicant) => (
                  <TableRow key={applicant.name}>
                    <TableCell className="font-medium">{applicant.name}</TableCell>
                    <TableCell>{applicant.country}</TableCell>
                    <TableCell className="text-slateText-secondary">{applicant.submitted}</TableCell>
                    <TableCell><StatusBadge value={applicant.risk} /></TableCell>
                    <TableCell><StatusBadge value={applicant.status} /></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Document preview panel</CardTitle>
            <FileSearch className="h-5 w-5 text-gold-300" />
          </CardHeader>
          <CardContent>
            <div className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-4">
              <div className="mb-4 h-48 rounded-xl border border-gold-500/20 bg-[linear-gradient(135deg,rgba(212,175,55,0.14),rgba(255,255,255,0.03))] p-4">
                <div className="h-4 w-32 rounded-full bg-[color:var(--control-hover)]" />
                <div className="mt-6 space-y-3">
                  <div className="h-3 w-full rounded-full bg-[color:var(--control-hover)]" />
                  <div className="h-3 w-5/6 rounded-full bg-[color:var(--control-hover)]" />
                  <div className="h-3 w-2/3 rounded-full bg-[color:var(--control-hover)]" />
                </div>
              </div>
              <p className="font-semibold">Orbit Commerce HK</p>
              <p className="mt-1 text-sm text-slateText-secondary"><T k="Certificate of incorporation, UBO register, address proof" /></p>
              <div className="mt-5 grid gap-2 sm:grid-cols-3">
                <Button size="sm"><CheckCircle2 className="h-3.5 w-3.5" />Approve</Button>
                <Button size="sm" variant="danger"><XCircle className="h-3.5 w-3.5" />Reject</Button>
                <Button size="sm" variant="secondary"><MessageSquareMore className="h-3.5 w-3.5" />Request info</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
