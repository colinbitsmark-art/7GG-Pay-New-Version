import { FileText } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder-page";

export default function ComplianceReportsPage() {
  return (
    <PlaceholderPage
      eyebrow="Admin module"
      title="Compliance Reports"
      description="Mock report hub reserved for audit exports, review summaries, and regulatory reporting."
      icon={FileText}
    />
  );
}
