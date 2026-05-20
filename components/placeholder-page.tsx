import { LucideIcon } from "lucide-react";
import { T } from "@/components/preferences-provider";
import { PageHeader } from "@/components/section-shell";
import { Card } from "@/components/ui/card";

export function PlaceholderPage({
  eyebrow,
  title,
  description,
  icon: Icon
}: {
  eyebrow: string;
  title: string;
  description: string;
  icon: LucideIcon;
}) {
  return (
    <>
      <PageHeader eyebrow={eyebrow} title={title} description={description} />
      <Card className="flex min-h-[460px] flex-col items-center justify-center p-8 text-center">
        <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-2xl border border-gold-500/25 bg-gold-500/10 text-gold-300">
          <Icon className="h-8 w-8" />
        </div>
        <h2 className="text-2xl font-semibold"><T k={title} /></h2>
        <p className="mt-3 max-w-md text-slateText-secondary"><T k={description} /></p>
      </Card>
    </>
  );
}
