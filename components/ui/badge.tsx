import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { translateNode } from "@/components/translated-text";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        gold: "border-gold-500/35 bg-gold-500/10 text-gold-500",
        success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-500 dark:text-emerald-300",
        warning: "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-300",
        danger: "border-red-500/30 bg-red-500/10 text-red-600 dark:text-red-300",
        muted: "border-[color:var(--border-muted)] bg-[color:var(--badge-muted-bg)] text-slateText-secondary"
      }
    },
    defaultVariants: {
      variant: "muted"
    }
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, children, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props}>
      {translateNode(children)}
    </div>
  );
}
