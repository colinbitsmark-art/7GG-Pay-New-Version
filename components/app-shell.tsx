"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bell,
  ChevronDown,
  Command,
  Globe2,
  LayoutDashboard,
  Search,
  ShieldCheck,
  UserRound,
  Wallet,
  ArrowDownToLine,
  ArrowUpFromLine,
  Repeat2,
  ReceiptText,
  KeyRound,
  Building2,
  Settings,
  ShieldAlert
} from "lucide-react";
import { Logo } from "@/components/platform-components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PreferenceControls, usePreferences } from "@/components/preferences-provider";
import { cn } from "@/lib/utils";

type NavItem = {
  label: string;
  href: string;
  icon: typeof LayoutDashboard;
  tag?: string;
};

const clientNav: NavItem[] = [
  { label: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { label: "Wallet", href: "/dashboard/wallet", icon: Wallet },
  { label: "Pay-in", href: "/dashboard/pay-in", icon: ArrowDownToLine },
  { label: "Pay-out", href: "/dashboard/pay-out", icon: ArrowUpFromLine },
  { label: "FX Swap", href: "/dashboard/fx-swap", icon: Repeat2 },
  { label: "Transactions", href: "/dashboard/transactions", icon: ReceiptText },
  { label: "Deposit Addresses", href: "/dashboard/deposit-addresses", icon: Building2 },
  { label: "API Keys", href: "/dashboard/api-keys", icon: KeyRound },
  { label: "Settings", href: "/dashboard/settings", icon: Settings }
];

const adminNav: NavItem[] = [
  { label: "Risk Overview", href: "/admin", icon: LayoutDashboard },
  { label: "Compliance Review", href: "/admin/compliance", icon: ShieldCheck },
  { label: "Deposit Risk", href: "/admin/risk", icon: ShieldAlert },
  { label: "Wallet Isolation", href: "/admin/wallet-isolation", icon: Building2 },
  { label: "Treasury Sweep", href: "/admin/treasury-sweep", icon: Repeat2 },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: ReceiptText },
  { label: "System Settings", href: "/admin/settings", icon: Settings }
];

export function AppShell({
  children,
  mode
}: {
  children: React.ReactNode;
  mode: "client" | "admin";
}) {
  const pathname = usePathname();
  const nav = mode === "client" ? clientNav : adminNav;
  const { t } = usePreferences();

  return (
    <div className="min-h-screen bg-[color:var(--surface-base)] text-slateText-primary">
      <div className="fixed inset-0 -z-10 bg-gold-radial" />
      <div className="fixed inset-0 -z-10 bg-obsidian-grid bg-[size:48px_48px] opacity-[0.12]" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-[color:var(--border-subtle)] bg-[color:var(--sidebar-bg)] p-4 backdrop-blur-2xl lg:block">
        <div className="mb-8 px-2 py-3">
          <Logo href="/" />
          <p className="mt-3 pl-14 text-xs text-slateText-secondary">
            {t(mode === "client" ? "Merchant Console" : "Admin Portal")}
          </p>
        </div>
        <nav className="space-y-1.5">
          {nav.map((item) => {
            const active =
              item.href === `/${pathname.split("/")[1]}`
                ? pathname === item.href
                : pathname.startsWith(item.href);
            const Icon = item.icon;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "group flex items-center justify-between rounded-xl px-3 py-2.5 text-sm text-slateText-secondary transition-all hover:bg-[color:var(--control-hover)] hover:text-slateText-primary",
                  active && "bg-gold-500/10 text-gold-300 shadow-[inset_3px_0_0_rgba(212,175,55,0.85)]"
                )}
              >
                <span className="flex items-center gap-3">
                  <Icon className="h-4 w-4" />
                  {t(item.label)}
                </span>
                {item.tag ? (
                  <span className="rounded-full border border-gold-500/25 px-2 py-0.5 text-[10px] text-gold-300">
                    {t(item.tag)}
                  </span>
                ) : null}
              </Link>
            );
          })}
        </nav>
        <div className="absolute bottom-4 left-4 right-4 rounded-2xl border border-[color:var(--border-subtle)] bg-[color:var(--control)] p-4">
          <div className="mb-3 flex items-center gap-2 text-gold-300">
            <Command className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-[0.2em]">
              {t("Sandbox")}
            </span>
          </div>
          <p className="text-sm text-slateText-secondary">
            {t("Mock infrastructure mode for UI presentation.")}
          </p>
        </div>
      </aside>
      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-[color:var(--border-subtle)] bg-[color:var(--topbar-bg)] px-4 py-3 text-slateText-primary backdrop-blur-2xl md:px-6">
          <div className="flex items-center gap-3">
            <div className="relative max-w-xl flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slateText-secondary" />
              <Input className="pl-9" placeholder="Search transactions, wallets, orders..." />
            </div>
            <Button variant="secondary" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
            <div className="hidden md:block">
              <PreferenceControls compact />
            </div>
            <Button variant="secondary" className="hidden md:inline-flex">
              <Globe2 className="h-4 w-4" />
              {t("Global Merchant")}
              <ChevronDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" aria-label="Profile">
              <UserRound className="h-5 w-5" />
            </Button>
          </div>
        </header>
        <main className="px-4 py-6 md:px-6 xl:px-8">{children}</main>
      </div>
    </div>
  );
}
