import { ListChecks } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder-page";

export default function SettlementQueuePage() {
  return (
    <PlaceholderPage
      eyebrow="Admin module"
      title="Settlement Queue"
      description="Mock queue view reserved for settlement review and operational release states."
      icon={ListChecks}
    />
  );
}
