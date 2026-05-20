import { ReactNode } from "react";
import { T } from "@/components/preferences-provider";

export function PageHeader({
  eyebrow,
  title,
  description,
  action
}: {
  eyebrow?: string;
  title: string;
  description: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        {eyebrow ? (
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.24em] text-gold-300">
            <T k={eyebrow} />
          </p>
        ) : null}
        <h1 className="text-2xl font-semibold tracking-tight text-slateText-primary md:text-3xl">
          <T k={title} />
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-6 text-slateText-secondary">
          <T k={description} />
        </p>
      </div>
      {action}
    </div>
  );
}
