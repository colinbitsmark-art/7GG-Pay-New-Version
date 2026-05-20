import { Badge } from "@/components/ui/badge";
import { T } from "@/components/preferences-provider";

const success = ["Paid", "Completed", "Confirmed", "Settled", "Sent", "Ready", "Approved", "Active", "Passed", "Swept", "Credited", "Clear", "Cleared", "AML Passed"];
const warning = ["Pending", "Processing", "Review", "EDD Required", "Enhanced Review", "Document Check", "Open", "Watching", "Broadcast", "Manual Review", "Pending Sweep", "Compliance Review", "Queued", "Analyst Assigned", "Counterparty Review", "Pending Review", "Awaiting Bank Confirmation", "Pending Approval", "Compliance Checking", "Created", "Risk Checking", "Reviewing", "Confirming", "Deposit Detected", "Keep Isolated", "Waiting for deposit", "Waiting for block confirmations", "Deposit review in progress"];
const danger = ["Failed", "Expired", "Blocked", "Rejected", "High", "Action Required", "High Risk Hit", "Isolated", "Potential match", "Frozen", "High Risk Detected", "Funds Isolated"];

export function StatusBadge({ value }: { value: string }) {
  const variant = success.includes(value)
    ? "success"
    : danger.includes(value)
      ? "danger"
      : warning.includes(value)
        ? "warning"
        : value === "Medium"
          ? "warning"
          : value === "Low"
            ? "success"
            : "muted";

  return <Badge variant={variant}><T k={value} /></Badge>;
}
