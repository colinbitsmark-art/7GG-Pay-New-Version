"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  Building2,
  CheckCircle2,
  CreditCard,
  FileSearch,
  Globe2,
  Layers3,
  LockKeyhole,
  Mail,
  Network,
  ReceiptText,
  RefreshCcw,
  Search,
  ShieldAlert,
  ShieldCheck,
  Upload,
  UserRound,
  WalletCards,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { LanguageSwitcher, ThemeSwitcher, usePreferences } from "@/components/preferences-provider";

export function Logo({
  iconOnly = false,
  href = "/"
}: {
  iconOnly?: boolean;
  href?: string;
}) {
  const { t } = usePreferences();

  return (
    <Link href={href} className="inline-flex items-center gap-3" data-no-auto-translate aria-label="7GG Pay">
      <span className="relative flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-gold-500/45 bg-[color:var(--public-panel-solid)] shadow-gold">
        <Image
          src="/logo/7gg-pay-logo.png"
          alt="7GG Pay logo"
          fill
          priority
          sizes="44px"
          className="object-cover"
        />
      </span>
      {!iconOnly ? (
        <span className="min-w-0">
          <span className="block text-lg font-semibold leading-tight tracking-tight text-slateText-primary">
            7GG Pay
          </span>
          <span className="block text-xs font-medium text-slateText-secondary">
            {t("Global payment infrastructure")}
          </span>
        </span>
      ) : null}
    </Link>
  );
}

export function LanguageThemeControls({ compact = true }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-2" data-no-auto-translate>
      <LanguageSwitcher compact={compact} />
      <ThemeSwitcher />
    </div>
  );
}

const publicNav = [
  ["Products", "/products"],
  ["Solutions", "/solutions"],
  ["Developers", "/developers"],
  ["Compliance", "/compliance"],
  ["反洗錢政策", "/aml-policy"],
  ["Pricing", "/pricing"],
  ["Contact", "/contact"]
];

export function PublicHeader() {
  const pathname = usePathname();
  const { t } = usePreferences();

  return (
    <header className="sticky top-0 z-40 border-b border-gold-500/20 bg-[color:var(--public-header)] text-slateText-primary shadow-[0_16px_60px_rgba(0,0,0,0.18)] backdrop-blur-2xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4">
        <Logo />
        <nav className="hidden items-center gap-6 text-sm font-medium text-slateText-secondary lg:flex">
          {publicNav.map(([label, href]) => (
            <Link
              key={href}
              href={href}
              className={cn(
                "rounded-lg px-1.5 py-1 transition hover:text-gold-500",
                pathname === href && "text-gold-500"
              )}
            >
              {t(label)}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <div className="hidden md:block">
            <LanguageThemeControls />
          </div>
          <Button asChild variant="ghost" className="hidden sm:inline-flex text-slateText-primary">
            <Link href="/login">{t("Login")}</Link>
          </Button>
          <Button asChild>
            <Link href="/register">{t("Register")}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}

export function PublicFooter() {
  const { t } = usePreferences();
  const groups = [
    ["Products", ["Global Pay-in", "Global Pay-out", "Multi-Currency Wallet", "FX Swap"]],
    ["Solutions", ["Cross-border E-commerce", "Trading Companies", "Web3 Businesses", "Global Merchants"]],
    ["Developers", ["API Overview", "Webhook", "Sandbox", "API Logs"]],
    ["Compliance", ["Canada MSB", "KYC / KYB", "AML / CFT", "Secure Operations"]],
    ["Company", ["Pricing", "Contact", "Login", "Register"]]
  ];

  return (
    <footer className="border-t border-gold-500/15 bg-[color:var(--public-header)] px-5 py-12 backdrop-blur-xl">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[1.1fr_2fr]">
        <div>
          <Logo />
          <p className="mt-5 max-w-sm text-sm leading-6 text-slateText-secondary">
            {t("A next-generation payment platform for global merchants, cross-border businesses, and digital asset companies.")}
          </p>
          <div className="mt-5">
            <LanguageThemeControls compact={false} />
          </div>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {groups.map(([title, items]) => (
            <div key={title as string}>
              <p className="mb-3 text-sm font-semibold text-slateText-primary">{t(title as string)}</p>
              <div className="space-y-2 text-sm text-slateText-secondary">
                {(items as string[]).map((item) => (
                  <p key={item}>{t(item)}</p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl text-sm text-slateText-secondary">
        {t("Copyright © 2026 7GG Pay. UI prototype with mock data only.")}
      </p>
    </footer>
  );
}

export function PublicShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="public-site min-h-screen text-slateText-primary">
      <div className="fixed inset-0 -z-10 bg-gold-radial" />
      <div className="fixed inset-0 -z-10 bg-obsidian-grid bg-[size:54px_54px] opacity-[0.12]" />
      <PublicHeader />
      {children}
      <PublicFooter />
    </div>
  );
}

export const productModules = [
  ["Global Pay-in", "Accept global payment methods with a unified merchant collection experience.", Globe2],
  ["Global Pay-out", "Send mock payouts through local rails, SWIFT, and crypto rails.", CreditCard],
  ["Multi-Currency Wallet", "Manage fiat and crypto balances in one operational treasury surface.", WalletCards],
  ["FX Swap Engine", "Quote and swap currency pairs with rate locks and fee previews.", RefreshCcw],
  ["Crypto-Fiat Gateway", "Bridge stablecoins, fiat balances, and merchant settlement workflows.", Network],
  ["Virtual Accounts Coming Soon", "Reserved virtual account issuance for future global collection.", Building2]
] as const;

export function FeatureCard({
  title,
  description,
  icon: Icon,
  items = ["Dashboard preview", "Mock workflow", "Operational states"]
}: {
  title: string;
  description: string;
  icon: typeof Globe2;
  items?: string[];
}) {
  const { t } = usePreferences();
  return (
    <Card className="p-5">
      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
        <Icon className="h-5 w-5" />
      </div>
      <h3 className="text-lg font-semibold">{t(title)}</h3>
      <p className="mt-3 text-sm leading-6 text-slateText-secondary">{t(description)}</p>
      <div className="mt-5 space-y-2 rounded-2xl border border-gold-500/15 bg-[color:var(--control)] p-3">
        {items.map((item) => (
          <div key={item} className="flex items-center justify-between rounded-lg bg-[color:var(--card)] px-3 py-2 text-xs">
            <span className="text-slateText-secondary">{t(item)}</span>
            <span className="h-2 w-16 rounded-full bg-gold-500/35" />
          </div>
        ))}
      </div>
    </Card>
  );
}

export function HeroVisual() {
  const { t } = usePreferences();
  return (
    <Card className="glass-border relative overflow-hidden border-gold-500/25 bg-[color:var(--public-panel)] p-4">
      <div className="rounded-2xl border border-gold-500/15 bg-[color:var(--public-panel)] p-4">
        <div className="mb-5 flex items-center justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-gold-500">{t("Global payment network")}</p>
            <p className="mt-1 text-xl font-semibold">{t("$18.42M settled today")}</p>
          </div>
          <Badge variant="success">{t("Live mock")}</Badge>
        </div>
        <div className="relative h-[360px] overflow-hidden rounded-2xl border border-gold-500/15 bg-[color:var(--public-visual)]">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(212,175,55,0.18),transparent_58%)]" />
          <div className="absolute inset-0 bg-obsidian-grid bg-[size:36px_36px] opacity-20" />
          {[
            ["Toronto", "USDT 84K", "left-8 top-10"],
            ["Hong Kong", "HKD 1.2M", "right-8 top-24"],
            ["London", "GBP 64K", "left-16 bottom-16"],
            ["Singapore", "USD 210K", "right-14 bottom-10"]
          ].map(([city, amount, pos], index) => (
            <div
              key={city}
              className={`absolute ${pos} animate-float rounded-2xl border border-gold-500/25 bg-[color:var(--public-panel)] p-4 shadow-gold backdrop-blur-xl`}
              style={{ animationDelay: `${index * 0.7}s` }}
            >
              <p className="text-xs text-slateText-secondary">{city}</p>
              <p className="mt-1 font-semibold text-gold-300">{amount}</p>
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 h-28 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full border border-gold-500/35 bg-gold-500/10 shadow-gold" />
          <div className="absolute left-[18%] top-[42%] h-px w-[64%] rotate-12 bg-gradient-to-r from-transparent via-gold-500 to-transparent" />
          <div className="absolute left-[22%] top-[58%] h-px w-[58%] -rotate-12 bg-gradient-to-r from-transparent via-gold-300 to-transparent" />
        </div>
      </div>
    </Card>
  );
}

export function PricingCard({
  plan,
  price,
  featured
}: {
  plan: string;
  price: string;
  featured?: boolean;
}) {
  const { t } = usePreferences();
  return (
    <Card className={cn("p-5", featured && "border-gold-500/50 shadow-gold")}>
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold">{t(plan)}</h3>
        {featured ? <Badge variant="gold">{t("Popular")}</Badge> : null}
      </div>
      <p className="mt-4 text-3xl font-semibold">{price}</p>
      <div className="mt-5 space-y-3 text-sm text-slateText-secondary">
        {["Pay-in fee placeholder", "Pay-out fee placeholder", "FX spread placeholder", "API access", "KYB support"].map((item) => (
          <p key={item} className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-gold-300" />
            {t(item)}
          </p>
        ))}
      </div>
      <Button className="mt-6 w-full">{t("Contact Sales")}</Button>
    </Card>
  );
}

export function ComingSoonBadge() {
  const { t } = usePreferences();
  return <Badge variant="gold">{t("Coming Soon")}</Badge>;
}

export function RiskBadge({ level }: { level: string }) {
  const variant = level === "High" || level === "Prohibited" ? "danger" : level === "Medium" ? "warning" : "success";
  const { t } = usePreferences();
  return <Badge variant={variant}>{t(level)}</Badge>;
}

export function RiskScoreBadge({ score }: { score: number }) {
  const variant = score >= 80 ? "danger" : score >= 50 ? "warning" : "success";
  return <Badge variant={variant}>{score}</Badge>;
}

export function Stepper({ steps }: { steps: string[] }) {
  const { t } = usePreferences();
  return (
    <div className="grid gap-3 md:grid-cols-4">
      {steps.map((step, index) => (
        <div key={step} className="rounded-2xl border border-gold-500/15 bg-[color:var(--card)] p-4">
          <span className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-gold-500 text-sm font-semibold text-black">
            {index + 1}
          </span>
          <p className="font-medium">{t(step)}</p>
        </div>
      ))}
    </div>
  );
}

export function FileUploadCard({ title }: { title: string }) {
  const { t } = usePreferences();
  return (
    <div className="flex min-h-36 flex-col items-center justify-center rounded-2xl border border-dashed border-gold-500/25 bg-[color:var(--control)] p-5 text-center">
      <Upload className="mb-3 h-6 w-6 text-gold-300" />
      <p className="font-medium">{t(title)}</p>
      <p className="mt-1 text-xs text-slateText-secondary">{t("Drag files here or browse mock upload")}</p>
    </div>
  );
}

export function EmptyState({ title, description }: { title: string; description: string }) {
  const { t } = usePreferences();
  return (
    <Card className="flex min-h-72 flex-col items-center justify-center p-8 text-center">
      <Layers3 className="mb-4 h-10 w-10 text-gold-300" />
      <h3 className="text-xl font-semibold">{t(title)}</h3>
      <p className="mt-2 max-w-md text-sm text-slateText-secondary">{t(description)}</p>
    </Card>
  );
}

export function EmailPreviewModal({ title = "Email preview" }: { title?: string }) {
  const { t } = usePreferences();
  return (
    <Card className="p-4">
      <div className="mb-3 flex items-center gap-2 text-gold-300">
        <Mail className="h-4 w-4" />
        <p className="text-sm font-semibold">{t(title)}</p>
      </div>
      <div className="space-y-2 rounded-xl border border-gold-500/15 bg-[color:var(--control)] p-3 text-sm text-slateText-secondary">
        <p>{t("Subject")}: 7GG Pay verification update</p>
        <p>{t("Message body")}: {t("This is a mock email preview for compliance workflow.")}</p>
      </div>
    </Card>
  );
}

export function ComposeEmailModal() {
  const { t } = usePreferences();
  return (
    <Card>
      <CardHeader><CardTitle>{t("Compose Email")}</CardTitle></CardHeader>
      <CardContent className="space-y-3">
        <Input placeholder={t("To")} />
        <Input placeholder={t("Subject")} />
        <Input placeholder={t("Template selector")} />
        <textarea className="min-h-28 w-full rounded-xl border border-gold-500/15 bg-[color:var(--control)] p-3 text-sm outline-none" placeholder={t("Message body")} />
        <Button className="w-full">{t("Send button")}</Button>
      </CardContent>
    </Card>
  );
}

export function ComplianceChecklist({ items }: { items: string[] }) {
  const { t } = usePreferences();
  return (
    <div className="space-y-2">
      {items.map((item) => (
        <div key={item} className="flex items-center justify-between rounded-xl border border-gold-500/15 bg-[color:var(--control)] px-3 py-2 text-sm">
          <span>{t(item)}</span>
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
        </div>
      ))}
    </div>
  );
}

export function AuditTimeline({ events }: { events: string[] }) {
  const { t } = usePreferences();
  return (
    <div className="space-y-4">
      {events.map((event, index) => (
        <div key={event} className="flex gap-3">
          <span className="mt-1 h-3 w-3 rounded-full bg-gold-500 shadow-gold" />
          <div>
            <p className="font-medium">{t(event)}</p>
            <p className="text-xs text-slateText-secondary">17 May 2026, 14:{20 + index * 7}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export function ReviewActionPanel({ actions }: { actions: string[] }) {
  const { t } = usePreferences();
  return (
    <Card>
      <CardHeader><CardTitle>{t("Review Actions")}</CardTitle></CardHeader>
      <CardContent className="space-y-2">
        {actions.map((action, index) => (
          <Button key={action} variant={index === 1 ? "danger" : index > 1 ? "secondary" : "default"} className="w-full justify-start">
            {t(action)}
          </Button>
        ))}
        <EmailPreviewModal />
      </CardContent>
    </Card>
  );
}

export function RateEditorModal() {
  const { t } = usePreferences();
  return (
    <Card>
      <CardHeader><CardTitle>{t("Edit Spread Modal")}</CardTitle></CardHeader>
      <CardContent className="grid gap-3 md:grid-cols-2">
        {["Currency pair", "Current market rate", "Current customer rate", "Spread %", "Fixed markup", "Effective time"].map((field) => (
          <Input key={field} placeholder={t(field)} />
        ))}
      </CardContent>
    </Card>
  );
}

export function AdminTable({
  columns,
  rows
}: {
  columns: string[];
  rows: Array<Array<React.ReactNode>>;
}) {
  const { t } = usePreferences();
  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--border-subtle)]">
      <table className="w-full text-sm">
        <thead className="bg-[color:var(--table-head)] text-xs uppercase tracking-[0.14em] text-slateText-secondary">
          <tr>
            {columns.map((column) => (
              <th key={column} className="px-4 py-3 text-left font-medium">{t(column)}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, index) => (
            <tr key={index} className="border-t border-[color:var(--border-muted)] transition-colors hover:bg-[color:var(--table-row-hover)]">
              {row.map((cell, cellIndex) => (
                <td key={cellIndex} className="px-4 py-3">{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function AdminTopbar() {
  const { t } = usePreferences();
  return (
    <header className="sticky top-0 z-20 border-b border-[color:var(--border-subtle)] bg-[color:var(--topbar-bg)] px-4 py-3 text-slateText-primary backdrop-blur-2xl md:px-6">
      <div className="flex items-center gap-3">
        <div className="relative max-w-xl flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slateText-secondary" />
          <Input className="pl-9" placeholder={t("Search users, cases, transactions...")} />
        </div>
        <Button variant="secondary" size="icon" aria-label="Notifications"><Bell className="h-4 w-4" /></Button>
        <div className="hidden md:block"><LanguageThemeControls /></div>
        <Button variant="secondary" className="hidden md:inline-flex">
          <UserRound className="h-4 w-4" />
          {t("Admin profile")}
        </Button>
      </div>
    </header>
  );
}

const staffAdminNav = [
  ["風控總覽", "/admin", ShieldAlert],
  ["合規審核", "/admin/compliance", ShieldCheck],
  ["充值風險", "/admin/risk", ShieldAlert],
  ["隔離錢包", "/admin/wallet-isolation", Building2],
  ["資金歸集", "/admin/treasury-sweep", WalletCards],
  ["審計日誌", "/admin/audit-logs", ReceiptText],
  ["系統設定", "/admin/settings", LockKeyhole],
  ["KYC 審核", "/admin/compliance/kyc", UserRound],
  ["KYB 審核", "/admin/compliance/kyb", Building2],
  ["入帳審核", "/admin/compliance/deposits", CreditCard],
  ["補件中心", "/admin/compliance/remediation", FileSearch]
] as const;

export function AdminSidebar() {
  const pathname = usePathname();
  const { t } = usePreferences();
  return (
    <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[color:var(--border-subtle)] bg-[color:var(--sidebar-bg)] p-4 backdrop-blur-2xl lg:block">
      <Logo href="/admin" />
      <p className="mb-6 mt-2 px-1 text-xs text-slateText-secondary">{t("Staff Admin Portal")}</p>
      <nav className="space-y-1.5">
        {staffAdminNav.map(([label, href, Icon]) => {
          const active = href === "/admin" || href === "/admin/compliance" ? pathname === href : pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slateText-secondary transition-all hover:bg-[color:var(--control-hover)] hover:text-slateText-primary",
                active && "bg-gold-500/10 text-gold-300 shadow-[inset_3px_0_0_rgba(212,175,55,0.85)]"
              )}
            >
              <Icon className="h-4 w-4" />
              {t(label)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}

export function StaffAdminShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[color:var(--surface-base)] text-slateText-primary">
      <div className="fixed inset-0 -z-10 bg-gold-radial" />
      <div className="fixed inset-0 -z-10 bg-obsidian-grid bg-[size:48px_48px] opacity-[0.1]" />
      <AdminSidebar />
      <div className="lg:pl-72">
        <AdminTopbar />
        <main className="px-4 py-6 md:px-6 xl:px-8">{children}</main>
      </div>
    </div>
  );
}
