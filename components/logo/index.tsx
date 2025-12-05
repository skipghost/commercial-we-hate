"use client";

import { useEffect, useState } from "react";

import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

import { Routes } from "@/constants/routes";

import { useMode } from "@/context/ModeContext";
import { Mode } from "@/types/enums";

interface LogoProps {
  className?: string;
  white?: boolean;
}

const Logo = ({ className, white }: LogoProps) => {
  const { mode } = useMode();
  const { theme } = useTheme();
  const [useWhite, setUseWhite] = useState(false);

  useEffect(() => {
    setUseWhite(white ?? theme === "dark");
  }, [white, theme]);

  const src =
    mode === Mode.LOVE
      ? useWhite
        ? "/commercials-we-love-white.png"
        : "/commercials-we-love.png"
      : useWhite
        ? "/commercials-we-hate-white.png"
        : "/commercials-we-hate.png";

  return (
    <Link href={Routes.HOME}>
      <Image
        src={src}
        alt="Logo"
        width={200}
        height={200}
        className={cn("w-32 md:w-36 object-contain shrink-0", className)}
      />
    </Link>
  );
};

export default Logo;

