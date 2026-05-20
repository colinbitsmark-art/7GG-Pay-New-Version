import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { translateNode } from "@/components/translated-text";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-medium transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-500/60 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default:
          "bg-gold-500 text-black shadow-gold hover:bg-gold-300 hover:shadow-[0_0_28px_rgba(212,175,55,0.28)]",
        secondary:
          "border border-gold-500/15 bg-[color:var(--control)] text-slateText-primary hover:border-gold-500/40 hover:bg-[color:var(--control-hover)]",
        ghost:
          "text-slateText-secondary hover:bg-[color:var(--control)] hover:text-slateText-primary",
        danger:
          "bg-red-500/12 text-red-300 ring-1 ring-red-500/25 hover:bg-red-500/20"
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-8 rounded-lg px-3 text-xs",
        icon: "h-10 w-10"
      }
    },
    defaultVariants: {
      variant: "default",
      size: "default"
    }
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {translateNode(children)}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
