import { cn } from "@/lib/utils";

export function Switch({
  checked,
  className
}: {
  checked?: boolean;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-11 items-center rounded-full border border-[color:var(--border-muted)] bg-[color:var(--control)] p-1 transition-colors",
        checked && "border-gold-500/40 bg-gold-500/25",
        className
      )}
    >
      <span
        className={cn(
          "h-4 w-4 rounded-full bg-slateText-secondary transition-transform",
          checked && "translate-x-5 bg-gold-300"
        )}
      />
    </span>
  );
}
