import { SlidersHorizontal } from "lucide-react";
import { PlaceholderPage } from "@/components/placeholder-page";

export default function FeeSettingsPage() {
  return (
    <PlaceholderPage
      eyebrow="Admin module"
      title="Fee Settings"
      description="Mock fee configuration surface for corridor, rail, and account-tier pricing presentation."
      icon={SlidersHorizontal}
    />
  );
}
