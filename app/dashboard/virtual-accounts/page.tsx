import { Building2 } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { Card } from "@/components/ui/card";

export default function VirtualAccountsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Reserved module"
        title="Virtual Accounts"
        description="Reserved surface for future global virtual account issuance."
      />
      <Card className="flex min-h-[520px] flex-col items-center justify-center text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
          <Building2 className="h-8 w-8" />
        </div>
        <h2 className="text-3xl font-semibold"><T k="Coming Soon" /></h2>
        <p className="mt-3 max-w-md text-slateText-secondary">
          <T k="Reserved for future global virtual account issuance." />
        </p>
      </Card>
    </>
  );
}
