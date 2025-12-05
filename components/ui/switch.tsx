import * as React from "react";
import * as SwitchPrimitives from "@radix-ui/react-switch";
import { cn } from "@/lib/utils";

interface SwitchProps extends React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root> {
  thumbClassName?: string;
}

const Switch = React.forwardRef<React.ElementRef<typeof SwitchPrimitives.Root>, SwitchProps>(
  ({ className, thumbClassName, children, ...props }, ref) => (
    <SwitchPrimitives.Root
      ref={ref}
      className={cn(
        "peer inline-flex h-10 w-20 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-950 focus-visible:ring-offset-2 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-neutral-900 data-[state=unchecked]:bg-neutral-200 dark:focus-visible:ring-neutral-300 dark:focus-visible:ring-offset-neutral-950 dark:data-[state=checked]:bg-neutral-50 dark:data-[state=unchecked]:bg-neutral-800",
        className
      )}
      {...props}
    >
      <SwitchPrimitives.Thumb
        className={cn(
          "pointer-events-none flex items-center justify-center h-9 w-9 rounded-full bg-white shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-10 data-[state=unchecked]:translate-x-0 dark:bg-neutral-950",
          thumbClassName
        )}
      >
        {children}
      </SwitchPrimitives.Thumb>
    </SwitchPrimitives.Root>
  )
);

Switch.displayName = SwitchPrimitives.Root.displayName;

export { Switch };

