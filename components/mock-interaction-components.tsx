"use client";

import { CheckCircle2, Copy, X } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function MockModal({
  title,
  children,
  onClose,
  wide = false
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
  wide?: boolean;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-md">
      <Card className={cn("max-h-[90vh] w-full overflow-hidden", wide ? "max-w-5xl" : "max-w-2xl")}>
        <CardHeader className="flex flex-row items-center justify-between border-b border-[color:var(--border-muted)]">
          <CardTitle>{title}</CardTitle>
          <Button size="icon" variant="ghost" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="max-h-[76vh] overflow-auto p-5">{children}</CardContent>
      </Card>
    </div>
  );
}

export function MockDrawer({
  title,
  children,
  onClose
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm">
      <div className="absolute right-0 top-0 h-full w-full max-w-xl overflow-auto border-l border-[color:var(--border-subtle)] bg-[color:var(--surface-base)] p-5 shadow-2xl">
        <div className="mb-5 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-slateText-primary"><T k={title} /></h2>
          <Button size="icon" variant="ghost" onClick={onClose} aria-label="Close">
            <X className="h-4 w-4" />
          </Button>
        </div>
        {children}
      </div>
    </div>
  );
}

export function CopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const copy = async () => {
    await navigator.clipboard?.writeText(value);
  };

  return (
    <Button type="button" size="sm" variant="secondary" onClick={copy}>
      <Copy className="h-3.5 w-3.5" />
      {label}
    </Button>
  );
}

export function InfoGrid({ items }: { items: Array<[string, React.ReactNode]> }) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      {items.map(([label, value]) => (
        <div key={label} className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-4">
          <p className="text-xs uppercase tracking-[0.16em] text-slateText-secondary"><T k={label} /></p>
          <div className="mt-2 text-sm font-medium text-slateText-primary">
            {typeof value === "string" ? <T k={value} /> : value}
          </div>
        </div>
      ))}
    </div>
  );
}

export function MockQrCode({ value }: { value: string }) {
  const bits = Array.from({ length: 121 }, (_, index) => {
    const code = value.charCodeAt(index % value.length) + index * 17;
    return code % 3 !== 0;
  });

  return (
    <div className="inline-grid grid-cols-11 gap-1 rounded-2xl border border-gold-500/25 bg-[color:var(--control)] p-3 shadow-gold">
      {bits.map((active, index) => (
        <span
          key={`${value}-${index}`}
          className={cn("h-2.5 w-2.5 rounded-[3px]", active ? "bg-gold-500" : "bg-slateText-primary/10")}
        />
      ))}
    </div>
  );
}

export function FlowSteps({ steps, activeIndex }: { steps: string[]; activeIndex: number }) {
  return (
    <div className="grid gap-2 md:grid-cols-5">
      {steps.map((step, index) => (
        <div key={step} className="rounded-2xl border border-[color:var(--border-muted)] bg-[color:var(--control)] p-3">
          <div className="mb-2 flex items-center justify-between">
            <span className={cn("flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold", index <= activeIndex ? "bg-gold-500 text-black" : "bg-slateText-primary/10 text-slateText-secondary")}>
              {index + 1}
            </span>
            {index < activeIndex ? <CheckCircle2 className="h-4 w-4 text-emerald-400" /> : null}
          </div>
          <p className="text-xs font-medium text-slateText-primary"><T k={step} /></p>
        </div>
      ))}
    </div>
  );
}

export function ResultPanel({ title, status, lines }: { title: string; status: string; lines: string[] }) {
  return (
    <div className="rounded-2xl border border-gold-500/20 bg-gold-500/10 p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-semibold"><T k={title} /></p>
        <StatusBadge value={status} />
      </div>
      <div className="space-y-2 text-sm text-slateText-secondary">
        {lines.map((line) => (
          <p key={line}><T k={line} /></p>
        ))}
      </div>
    </div>
  );
}
