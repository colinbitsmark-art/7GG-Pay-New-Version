"use client";

import {
  AlertTriangle,
  Building2,
  CheckCircle2,
  Clock3,
  FileSearch,
  ShieldAlert,
  ShieldCheck,
  Users
} from "lucide-react";
import { ComplianceDonut, RiskAlertChart, VolumeChart } from "@/components/charts";
import { KpiCard } from "@/components/kpi-card";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  AdminTable,
  AuditTimeline,
  ComplianceChecklist,
  ComposeEmailModal,
  EmailPreviewModal,
  FileUploadCard,
  RateEditorModal,
  ReviewActionPanel,
  RiskBadge,
  RiskScoreBadge
} from "@/components/platform-components";
import { amlScreenings, applicants, complianceCases, complianceQueue, deposits, suspiciousTransactions, sweepTransactions, walletIsolationEvents } from "@/lib/mock-data";
import { usePreferences } from "@/components/preferences-provider";

const userRows = [
  ["USR-10091", "Orbit Commerce HK", "Business", "Hong Kong", "Under Review", "Medium", "Active", "17 May 2026"],
  ["USR-10090", "Maya Chen", "Personal", "Canada", "Approved", "Low", "Active", "16 May 2026"],
  ["USR-10089", "Blue Harbor OTC", "Business", "Canada", "More Info Required", "High", "Frozen", "15 May 2026"]
];

export function AdminOverviewContent() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow="Staff Admin Portal" title="Admin Overview" description="Institutional staff console for verification, risk, transactions, FX, fees, emails, and compliance reporting." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <KpiCard title="Total Users" value="4,829" change="+6.2%" icon={Users} tone="blue" />
        <KpiCard title="Business Accounts" value="1,284" change="+8.1%" icon={Building2} />
        <KpiCard title="Pending KYC" value="128" change="+14" icon={ShieldCheck} />
        <KpiCard title="Pending KYB" value="42" change="+6" icon={FileSearch} />
        <KpiCard title="High Risk Cases" value="19" change="+3" icon={ShieldAlert} tone="red" />
        <KpiCard title="Daily Transaction Volume" value="$4.8M" change="+9.4%" icon={AlertTriangle} tone="green" />
        <KpiCard title="FX Revenue" value="$82.4K" change="+11.2%" icon={CheckCircle2} />
        <KpiCard title="Open Alerts" value="37" change="+5" icon={Clock3} tone="red" />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-2">
        <Card><CardHeader><CardTitle>{t("User growth chart")}</CardTitle></CardHeader><CardContent><VolumeChart /></CardContent></Card>
        <Card><CardHeader><CardTitle>{t("Risk alert distribution chart")}</CardTitle></CardHeader><CardContent><RiskAlertChart /></CardContent></Card>
        <Card><CardHeader><CardTitle>{t("Verification queue chart")}</CardTitle></CardHeader><CardContent><ComplianceDonut /></CardContent></Card>
        <Card><CardHeader><CardTitle>{t("Transaction volume chart")}</CardTitle></CardHeader><CardContent><VolumeChart /></CardContent></Card>
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <AdminMiniTable title="Latest verification cases" />
        <AdminMiniTable title="Latest risk alerts" />
        <AdminMiniTable title="Latest admin actions" />
      </div>
      <div className="mt-6 grid gap-5 xl:grid-cols-3">
        <Card>
          <CardHeader><CardTitle>{t("Admin Compliance Dashboard")}</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["Open Compliance Cases", "Isolated Deposits", "Queued Sweeps"]}
              rows={[[complianceCases.length, deposits.filter((deposit) => deposit.walletStatus === "Isolated").length, sweepTransactions.filter((sweep) => sweep.status === "Queued").length]]}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t("AML Screening")}</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["ID", "Result", "Risk score", "Analyst"]}
              rows={amlScreenings.slice(0, 3).map((screening) => [
                screening.id,
                <StatusBadge key={`${screening.id}-status`} value={screening.result} />,
                <RiskScoreBadge key={`${screening.id}-score`} score={screening.riskScore} />,
                screening.analyst
              ])}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t("Wallet Isolation Monitor")}</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["ID", "Asset", "Risk score", "Status"]}
              rows={walletIsolationEvents.slice(0, 3).map((event) => [
                event.id,
                event.asset,
                <RiskScoreBadge key={`${event.id}-score`} score={event.riskScore} />,
                <StatusBadge key={`${event.id}-status`} value={event.status} />
              ])}
            />
          </CardContent>
        </Card>
      </div>
    </>
  );
}

function AdminMiniTable({ title }: { title: string }) {
  const rows = complianceQueue.map((item) => [
    item.caseId,
    item.business,
    <RiskBadge key={item.caseId} level={item.risk} />,
    <StatusBadge key={`${item.caseId}-s`} value={item.status} />
  ]);
  return (
    <Card>
      <CardHeader><CardTitle>{title}</CardTitle></CardHeader>
      <CardContent><AdminTable columns={["Case ID", "Account Name", "Risk Level", "Status"]} rows={rows} /></CardContent>
    </Card>
  );
}

export function UserManagementContent() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow="Staff Admin Portal" title="User Management" description="User and merchant account operations with mock action drawer controls." />
      <Card>
        <CardHeader><CardTitle>{t("User Management")}</CardTitle></CardHeader>
        <CardContent>
          <AdminTable
            columns={["User ID", "Name / Company", "Account Type", "Country", "Verification Status", "Risk Level", "Account Status", "Created Date", "Action"]}
            rows={userRows.map((row) => [
              ...row.slice(0, 5),
              <RiskBadge key={`${row[0]}-risk`} level={row[5]} />,
              <StatusBadge key={`${row[0]}-status`} value={row[6]} />,
              row[7],
              <Button key={`${row[0]}-action`} variant="secondary" size="sm">{t("View profile")}</Button>
            ])}
          />
        </CardContent>
      </Card>
      <div className="mt-6 grid gap-5 md:grid-cols-5">
        {["View profile", "Freeze account", "Mark high risk", "Send email", "Add internal note"].map((action) => (
          <Card key={action} className="p-4"><p className="font-medium">{t(action)}</p><p className="mt-2 text-sm text-slateText-secondary">{t("Mock modal / drawer action UI")}</p></Card>
        ))}
      </div>
    </>
  );
}

export function KycWorkbenchContent() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow="Verification" title="KYC Review" description="Personal KYC review workbench with applicant list, document preview, risk score, notes, and action modals." />
      <div className="mb-5 flex flex-wrap gap-2">
        {["Pending", "Under Review", "Approved", "Rejected", "More Info Required", "High Risk"].map((filter) => <Button key={filter} variant="secondary" size="sm">{t(filter)}</Button>)}
      </div>
      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.35fr_0.9fr]">
        <Card><CardHeader><CardTitle>{t("Applicant list")}</CardTitle></CardHeader><CardContent className="space-y-2">{applicants.map((a) => <div key={a.name} className="rounded-xl border border-gold-500/15 bg-[color:var(--control)] p-3"><p className="font-medium">{a.name}</p><RiskBadge level={a.risk} /></div>)}</CardContent></Card>
        <Card>
          <CardHeader><CardTitle>{t("Personal information")}</CardTitle></CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2">
            {["ID document preview", "Proof of address preview", "Selfie / liveness placeholder", "Screening result mock"].map((item) => <FileUploadCard key={item} title={item} />)}
            <div className="md:col-span-2 rounded-2xl border border-gold-500/15 bg-[color:var(--control)] p-4">
              <p className="font-semibold">{t("Risk score")}: 64</p>
              <Input className="mt-3" placeholder={t("Internal notes")} />
            </div>
          </CardContent>
        </Card>
        <ReviewActionPanel actions={["Approve", "Reject", "Request More Information", "Mark as Under Review", "Escalate to Compliance Officer"]} />
      </div>
      <div className="mt-6 grid gap-5 md:grid-cols-3">
        <EmailPreviewModal title="Approve modal" />
        <EmailPreviewModal title="Reject modal" />
        <EmailPreviewModal title="Request More Information modal" />
      </div>
    </>
  );
}

export function KybWorkbenchContent() {
  const { t } = usePreferences();
  const checklist = ["Company registry verified", "UBO identified", "Director documents reviewed", "Business address verified", "Source of funds reviewed", "Sanctions screening checked", "Risk rating assigned"];
  return (
    <>
      <PageHeader eyebrow="Verification" title="KYB Review" description="Business KYB review workbench for company profile, UBO, directors, documents, use case, source of funds, and compliance checklist." />
      <div className="grid gap-5 xl:grid-cols-[0.75fr_1.35fr_0.9fr]">
        <Card><CardHeader><CardTitle>{t("Company list")}</CardTitle></CardHeader><CardContent className="space-y-2">{["Orbit Commerce HK", "Blue Harbor OTC", "Atlas Web3 Labs"].map((a) => <div key={a} className="rounded-xl border border-gold-500/15 bg-[color:var(--control)] p-3"><p className="font-medium">{a}</p><RiskBadge level={a.includes("Blue") ? "High" : "Medium"} /></div>)}</CardContent></Card>
        <Card>
          <CardHeader><CardTitle>{t("Company detail")}</CardTitle></CardHeader>
          <CardContent className="grid gap-3 md:grid-cols-2">
            {["Company profile", "Registered address", "Operating address", "Directors", "UBO ownership table", "Business use case", "Expected monthly volume", "Countries of operation", "Source of funds", "Uploaded documents"].map((item) => <div key={item} className="rounded-xl border border-gold-500/15 bg-[color:var(--control)] p-3 text-sm">{t(item)}</div>)}
            <div className="md:col-span-2"><ComplianceChecklist items={checklist} /></div>
          </CardContent>
        </Card>
        <ReviewActionPanel actions={["Approve KYB", "Reject KYB", "Request More Documents", "Set Risk Level", "Assign Reviewer", "Escalate Case"]} />
      </div>
    </>
  );
}

export function CasesContent() {
  const { t } = usePreferences();
  const columns = ["Case ID", "Account Name", "Type: KYC / KYB", "Assigned Reviewer", "Status", "Risk Level", "Last Updated", "SLA Timer", "Action"];
  const rows = complianceQueue.map((c) => [c.caseId, c.business, c.type, "Maya Chen", <StatusBadge key={c.caseId} value={c.status} />, <RiskBadge key={`${c.caseId}-r`} level={c.risk} />, "17 May 2026", "03:42:11", <Button key={`${c.caseId}-a`} size="sm" variant="secondary">{t("Open")}</Button>]);
  return (
    <>
      <PageHeader eyebrow="Cases" title="Verification Cases" description="Case table and kanban view for KYC and KYB verification operations." />
      <Card><CardContent className="pt-5"><AdminTable columns={columns} rows={rows} /></CardContent></Card>
      <div className="mt-6 grid gap-4 md:grid-cols-5">
        {["Pending", "Under Review", "More Info Required", "Approved", "Rejected"].map((lane) => <Card key={lane} className="min-h-48 p-4"><p className="font-semibold">{t(lane)}</p><div className="mt-4 rounded-xl bg-[color:var(--control)] p-3 text-sm text-slateText-secondary">KYB-3019</div></Card>)}
      </div>
    </>
  );
}

export function RiskStrategyContent() {
  const { t } = usePreferences();
  const rows = ["Transaction amount", "Transaction frequency", "Country risk", "User risk level", "Crypto wallet risk", "Failed payment attempts", "Velocity rule"].map((cat, i) => [`Rule ${i + 1}`, cat, "> threshold", <RiskBadge key={cat} level={i > 3 ? "High" : "Medium"} />, "Require manual review", <StatusBadge key={`${cat}-s`} value="Active" />, "17 May 2026"]);
  return (
    <>
      <PageHeader eyebrow="Risk" title="Risk Strategy" description="Risk rules, scoring, country matrix, transaction limits, and crypto wallet placeholders." />
      <div className="mb-6 grid gap-4 md:grid-cols-3 xl:grid-cols-6">
        {["Risk Rules List", "Create Risk Rule Modal", "Risk Score Settings", "Country Risk Matrix", "Transaction Limit Rules", "Crypto Wallet Risk Placeholder"].map((item) => <Card key={item} className="p-4"><p className="text-sm font-medium">{t(item)}</p></Card>)}
      </div>
      <div className="mb-6 grid gap-5 xl:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>{t("AML Screening")}</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["ID", "Deposit", "Result", "Risk score", "Matched Category"]}
              rows={amlScreenings.map((screening) => [
                screening.id,
                screening.depositId,
                <StatusBadge key={`${screening.id}-status`} value={screening.result} />,
                <RiskScoreBadge key={`${screening.id}-score`} score={screening.riskScore} />,
                screening.matchedCategory
              ])}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>{t("Wallet Risk Isolation")}</CardTitle></CardHeader>
          <CardContent>
            <AdminTable
              columns={["ID", "Wallet", "Reason", "Status", "Next Action"]}
              rows={walletIsolationEvents.map((event) => [
                event.id,
                event.wallet,
                event.reason,
                <StatusBadge key={`${event.id}-status`} value={event.status} />,
                event.nextAction
              ])}
            />
          </CardContent>
        </Card>
      </div>
      <Card><CardContent className="pt-5"><AdminTable columns={["Rule Name", "Category", "Trigger", "Risk Level", "Action", "Status", "Last Updated"]} rows={rows} /></CardContent></Card>
    </>
  );
}

export function TransactionMonitoringContent() {
  const { t } = usePreferences();
  const rows = suspiciousTransactions.map((tx) => [tx.id, tx.customer, tx.route.includes("USDT") ? "Crypto" : "Fiat", tx.amount, "USD", "HK", <RiskBadge key={tx.id} level={tx.score > 80 ? "High" : "Medium"} />, <StatusBadge key={`${tx.id}-s`} value={tx.status} />, "14:28", <Button key={`${tx.id}-a`} size="sm" variant="secondary">{t("Review")}</Button>]);
  return (
    <>
      <PageHeader eyebrow="Monitoring" title="Transaction Monitoring" description="Suspicious transaction table, risk score badges, transaction timeline, filters, and review drawer." />
      <Card className="mb-6"><CardContent className="grid gap-3 pt-5 md:grid-cols-4"><Input placeholder={t("Risk score > 50")} /><Input placeholder={t("All rails")} /><Input placeholder={t("Last 7 days")} /><Button variant="secondary">{t("Apply filters")}</Button></CardContent></Card>
      <div className="grid gap-5 xl:grid-cols-[1.35fr_0.65fr]">
        <Card><CardContent className="pt-5"><AdminTable columns={["Transaction ID", "User / Company", "Type", "Amount", "Currency", "Country", "Risk Score", "Status", "Time", "Action"]} rows={rows} /></CardContent></Card>
        <Card><CardHeader><CardTitle>{t("Transaction timeline")}</CardTitle></CardHeader><CardContent><AuditTimeline events={["Order created", "Velocity rule triggered", "Analyst review opened", "Payout blocked"]} /></CardContent></Card>
      </div>
    </>
  );
}

export function FxRatesContent() {
  const { t } = usePreferences();
  const pairs = ["USD/HKD", "USD/CAD", "USDT/USD", "BTC/USD", "ETH/USD", "EUR/USD", "GBP/USD"];
  const rows = pairs.map((pair, i) => [pair, "1.0000", "1.0025", "25 bps", `${0.18 + i / 100}%`, "17 May 2026", <StatusBadge key={pair} value="Active" />, <Button key={`${pair}-a`} size="sm" variant="secondary">{t("Edit spread")}</Button>]);
  return (
    <>
      <PageHeader eyebrow="Treasury" title="FX Rate Management" description="Live rates, customer rates, spreads, pair settings, adjustment history, and rate editor modal." />
      <div className="mb-6 grid gap-4 md:grid-cols-5">{["Live Market Rates", "7GG Customer Rates", "Spread Configuration", "Currency Pair Settings", "Rate Adjustment History"].map((item) => <Card key={item} className="p-4"><p className="font-medium">{t(item)}</p></Card>)}</div>
      <Card><CardContent className="pt-5"><AdminTable columns={["Pair", "Market Rate", "7GG Rate", "Spread", "Markup %", "Last Updated", "Status", "Action"]} rows={rows} /></CardContent></Card>
      <div className="mt-6"><RateEditorModal /></div>
    </>
  );
}

export function FeesContent() {
  const { t } = usePreferences();
  const rows = ["Pay-in fee", "Pay-out fee", "FX fee", "Crypto deposit / withdrawal fee"].map((fee, i) => [`Merchant ${i + 1}`, fee, "Percentage", `${0.2 + i / 10}%`, "01 Jun 2026", <StatusBadge key={fee} value="Active" />, <Button key={`${fee}-a`} size="sm" variant="secondary">{t("Edit")}</Button>]);
  return (
    <>
      <PageHeader eyebrow="Pricing Ops" title="Fee Settings" description="Pay-in, pay-out, FX, crypto fees, and merchant custom fee table." />
      <Card><CardContent className="pt-5"><AdminTable columns={["Merchant", "Product", "Fee type", "Fee value", "Effective date", "Status", "Action"]} rows={rows} /></CardContent></Card>
    </>
  );
}

export function EmailsContent() {
  const { t } = usePreferences();
  const templates = ["KYC Approved", "KYC Rejected", "KYC More Information Required", "KYB Approved", "KYB Rejected", "KYB More Documents Required", "Account Under Review", "Account Frozen Notice"];
  const rows = templates.slice(0, 4).map((tpl) => ["user@example.com", tpl, "KYB-3019", "Maya Chen", "17 May 2026", <StatusBadge key={tpl} value="Sent" />]);
  return (
    <>
      <PageHeader eyebrow="Comms" title="Email Center" description="Email templates, compose email modal, history table, and case reference previews." />
      <div className="grid gap-5 xl:grid-cols-[0.8fr_1.2fr]">
        <Card><CardHeader><CardTitle>{t("Email templates")}</CardTitle></CardHeader><CardContent className="space-y-2">{templates.map((tpl) => <div key={tpl} className="rounded-xl border border-gold-500/15 bg-[color:var(--control)] p-3">{t(tpl)}</div>)}</CardContent></Card>
        <ComposeEmailModal />
      </div>
      <Card className="mt-6"><CardHeader><CardTitle>{t("Email History Table")}</CardTitle></CardHeader><CardContent><AdminTable columns={["Recipient", "Subject", "Related Case", "Sent By", "Sent Time", "Status"]} rows={rows} /></CardContent></Card>
    </>
  );
}

export function ReportsContent() {
  const { t } = usePreferences();
  const reports = ["STR report placeholder", "Large transaction report placeholder", "KYC audit report", "KYB audit report"];
  return (
    <>
      <PageHeader eyebrow="Reports" title="Compliance Reports" description="Compliance report placeholders, export actions, and report history table." action={<Button>{t("Export report")}</Button>} />
      <div className="grid gap-5 md:grid-cols-4">{reports.map((report) => <Card key={report} className="p-5"><FileSearch className="mb-4 h-6 w-6 text-gold-300" /><p className="font-semibold">{t(report)}</p></Card>)}</div>
      <Card className="mt-6"><CardContent className="pt-5"><AdminTable columns={["Report", "Created Date", "Status", "Action"]} rows={reports.map((r) => [r, "17 May 2026", <StatusBadge key={r} value="Completed" />, <Button key={`${r}-a`} size="sm" variant="secondary">{t("Download")}</Button>])} /></CardContent></Card>
    </>
  );
}

export function SystemSettingsContent() {
  const { t } = usePreferences();
  return (
    <>
      <PageHeader eyebrow="System" title="System Settings" description="Admin roles, permissions, login security, audit logs, notifications, language, and theme settings." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {["Admin roles", "Permissions", "Login security", "Audit logs", "Notification settings", "Language settings", "Theme settings"].map((item) => <Card key={item} className="p-5"><p className="font-semibold">{t(item)}</p><p className="mt-2 text-sm text-slateText-secondary">{t("Mock system configuration panel")}</p></Card>)}
      </div>
    </>
  );
}
