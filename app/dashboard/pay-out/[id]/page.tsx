import { CheckCircle2, Clock3, ShieldCheck } from "lucide-react";
import { FlowSteps, InfoGrid } from "@/components/mock-interaction-components";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const payoutSteps = ["Created", "Reviewing", "Approved", "Processing", "Completed"];

export default async function PayoutDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  return (
    <>
      <PageHeader
        eyebrow="Global disbursement"
        title="Payout detail"
        description="Mock payout status page showing review, approval, processing, and completion timeline."
      />

      <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>{id}</CardTitle>
            <StatusBadge value="Processing" />
          </CardHeader>
          <CardContent className="space-y-5">
            <FlowSteps steps={payoutSteps} activeIndex={3} />
            <InfoGrid
              items={[
                ["Beneficiary name", "Apex Logistics"],
                ["Rail", "SWIFT"],
                ["Source wallet", "USD Operating Wallet"],
                ["Amount", "42,000.00 USD"],
                ["Fee", "0.18% / $75.60"],
                ["Estimated arrival", "T+1"],
                ["Payment notice", "Mock payout only. No real payment has been sent."],
                ["Status", <StatusBadge key="status" value="Processing" />]
              ]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>Status timeline</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              ["Created", "Mock payout instruction created", CheckCircle2],
              ["Reviewing", "Payment review completed", ShieldCheck],
              ["Approved", "Mock approval completed", CheckCircle2],
              ["Processing", "Waiting for mock rail completion", Clock3]
            ].map(([status, detail, Icon]) => (
              <div key={status as string} className="flex gap-3 rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3">
                <Icon className="mt-0.5 h-4 w-4 text-gold-300" />
                <div>
                  <p className="font-medium">{status as string}</p>
                  <p className="text-sm text-slateText-secondary">{detail as string}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </>
  );
}
