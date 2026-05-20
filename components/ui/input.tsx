"use client";

import * as React from "react";
import { usePreferences } from "@/components/preferences-provider";
import { cn } from "@/lib/utils";

type InputProps = React.InputHTMLAttributes<HTMLInputElement>;

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, placeholder, defaultValue, ...props }, ref) => {
    const { language, t } = usePreferences();
    const translatedDefaultValue =
      typeof defaultValue === "string" ? t(defaultValue) : defaultValue;

    return (
      <input
        key={`${language}-${typeof defaultValue === "string" ? defaultValue : ""}-${placeholder ?? ""}`}
        type={type}
        className={cn(
          "flex h-10 w-full rounded-xl border border-[color:var(--border-subtle)] bg-[color:var(--input-bg)] px-3 py-2 text-sm text-slateText-primary placeholder:text-slateText-secondary/70 transition-colors focus:border-gold-500/45 focus:outline-none focus:ring-2 focus:ring-gold-500/15",
          className
        )}
        ref={ref}
        placeholder={placeholder ? t(placeholder) : placeholder}
        defaultValue={translatedDefaultValue}
        {...props}
      />
    );
  }
);
Input.displayName = "Input";

export { Input };
