import { ReactNode } from "react";

import { cn } from "@/lib/utils";

interface ContainerProps {
  className?: string;
  children: ReactNode;
}

const Container = ({ className, children }: ContainerProps) => {
  return <div className={cn("grid xl:grid-cols-[minmax(0,1400px)_minmax(0,0px)]", className)}>{children}</div>;
};

export default Container;

