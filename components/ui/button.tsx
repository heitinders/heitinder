import * as React from "react";

import { cn } from "@/lib/utils";

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "ghost";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", type = "button", ...props }, ref) => (
    <button
      ref={ref}
      type={type}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition",
        variant === "default" &&
          "bg-gradient-to-r from-[var(--accent-primary)] to-[var(--accent-secondary)] text-[var(--bg-base)] shadow-[0_10px_30px_rgba(201,169,110,0.25)]",
        variant === "ghost" && "border border-white/10 bg-white/[0.02] text-white/85 hover:bg-white/[0.05]",
        className,
      )}
      {...props}
    />
  ),
);

Button.displayName = "Button";
