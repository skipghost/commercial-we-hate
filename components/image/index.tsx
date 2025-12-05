import NextImage from "next/image";

import { cn } from "@/lib/utils";

type ImageProps = {
  className: string;
  imageClassName?: string;
  src: string;
  alt: string;
  onClick?: () => void;
  fill?: boolean;
};

const Image = ({ className, imageClassName, fill = true, ...rest }: ImageProps) => {
  return (
    <div className={`relative ${className}`}>
      <NextImage
        className={cn("object-cover", imageClassName)}
        fill={fill}
        {...rest}
      />
    </div>
  );
};

export default Image;

