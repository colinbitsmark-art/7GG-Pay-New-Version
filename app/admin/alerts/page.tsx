import { AlertCircle, CheckCircle2, Clock3 } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { StatusBadge } from "@/components/status-badge";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { alerts } from "@/lib/mock-data";

export default function AlertsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Command center"
        title="Alerts"
        description="Alert cards, severity labels, status indicators, and action required badges for compliance operations."
      />
      <div className="grid gap-5 xl:grid-cols-3">
        {alerts.map((alert) => {
          const Icon = alert.severity === "High" ? AlertCircle : alert.severity === "Medium" ? Clock3 : CheckCircle2;
          return (
            <Card key={alert.title} className="p-5">
              <div className="mb-6 flex items-start justify-between">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
                  <Icon className="h-5 w-5" />
                </div>
                <StatusBadge value={alert.severity} />
              </div>
              <h2 className="text-lg font-semibold"><T k={alert.title} /></h2>
              <p className="mt-2 text-sm text-slateText-secondary">{alert.entity}</p>
              <div className="mt-6 flex items-center justify-between">
                <Badge variant={alert.status === "Action Required" ? "danger" : "warning"}>{alert.status}</Badge>
                <span className="h-2.5 w-2.5 rounded-full bg-gold-300 shadow-gold" />
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}
