import { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

interface MenuItemProps {
  className?: string;
  children: ReactNode;
  component?: ElementType;
  onClick?: () => void;
  [key: string]: any;
}

const MenuItem = ({ className, children, component: Component = "button", ...props }: MenuItemProps) => {
  return (
    <Component
      className={cn(
        "text-foreground group gap-4 text-sm flex items-center px-5 py-3 transition-all duration-300 hover:bg-neutral-100 dark:hover:bg-ghost-hover",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};

export default MenuItem;

