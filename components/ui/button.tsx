import * as React from "react";

import { Slot } from "@radix-ui/react-slot";
import { type VariantProps, cva } from "class-variance-authority";

import { cn } from "@/lib/utils";

import { LoadingSpinner } from "../loading-spinner";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium ring-offset-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 dark:ring-offset-neutral-950 dark:focus-visible:ring-neutral-300",
  {
    variants: {
      variant: {
        default: "bg-primary text-neutral-50 hover:bg-primary/90",
        destructive:
          "bg-red-600 text-neutral-50 hover:bg-red-500/90 dark:bg-red-900 dark:text-neutral-50 dark:hover:bg-red-900/90",
        outline:
          "border border-neutral-500 bg-white hover:bg-neutral-100 hover:text-neutral-900 dark:border-neutral-500 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:hover:text-neutral-50",
        secondary:
          "bg-secondary text-white hover:bg-secondary/80 dark:bg-neutral-800 dark:text-neutral-50 dark:hover:bg-neutral-800/80",
        ghost: "bg-ghost hover:bg-ghost-hover text-text-title",
        link: "text-neutral-900 hover:bg-neutral-100 dark:text-neutral-50 dark:bg-neutral-800 dark:hover:bg-neutral-700",
      },
      size: {
        default: "px-6 py-3",
        sm: "h-10 px-4",
        lg: "h-12 px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, children, disabled, loading, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        disabled={disabled || loading}
        {...props}
      >
        {loading ? <LoadingSpinner /> : children}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };

