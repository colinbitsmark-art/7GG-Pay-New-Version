import { LucideIcon } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export function KpiCard({
  title,
  value,
  change,
  icon: Icon,
  tone = "gold"
}: {
  title: string;
  value: string;
  change: string;
  icon: LucideIcon;
  tone?: "gold" | "green" | "red" | "blue";
}) {
  const toneClass = {
    gold: "text-gold-300 bg-gold-500/10",
    green: "text-emerald-300 bg-emerald-500/10",
    red: "text-red-300 bg-red-500/10",
    blue: "text-sky-300 bg-sky-500/10"
  }[tone];

  return (
    <Card className="group overflow-hidden p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-slateText-secondary"><T k={title} /></p>
          <p className="mt-3 text-2xl font-semibold tracking-tight text-slateText-primary">
            {value}
          </p>
        </div>
        <div className={cn("rounded-xl p-2.5", toneClass)}>
          <Icon className="h-5 w-5" />
        </div>
      </div>
      <div className="mt-5 flex items-center gap-2 text-xs text-slateText-secondary">
        <span className="rounded-full border border-gold-500/25 bg-gold-500/10 px-2 py-1 text-gold-300">
          {change}
        </span>
        <T k="vs last 30 days" />
      </div>
    </Card>
  );
}
