"use client";

import { cn } from "@/lib/utils";

type TitleProps = {
  title: string;
  subTitle: string;
  className?: string;
  center?: boolean;
  white?: boolean;
  description?: string;
  titleClassName?: string;
  subTitleClassName?: string;
};

const Title = ({
  title,
  subTitle,
  className,
  center,
  white,
  subTitleClassName = "",
  titleClassName = "",
  description = "",
}: TitleProps) => {
  return (
    <div
      className={cn(
        "relative flex flex-col gap-2.5 lg:gap-3 mb-6 sm:mb-8 md:mb-10 h-fit",
        center && "items-start sm:items-center xs:flex-col",
        white && "text-white",
        className
      )}
    >
      {subTitle && (
        <h3
          className={cn(
            "text-secondary text-xl rounded-sm font-medium capitalize flex items-center gap-2 w-fit",
            !center && "tracking-tight whitespace-nowrap",
            center && "sm:text-center",
            white && "text-gray-100",
            subTitleClassName
          )}
        >
          {subTitle}
        </h3>
      )}

      {title && (
        <h2
          className={cn(
            `text-pretty relative text-black font-bold w-fit max-w-2xl leading-[120%]`,
            center && "sm:text-center",
            white && "text-white",
            titleClassName
          )}
        >
          {title}
        </h2>
      )}
      {description && (
        <p className={cn("max-w-3xl", center && "sm:text-center mx-auto", white && "text-gray-200")}>{description}</p>
      )}
    </div>
  );
};

export default Title;

