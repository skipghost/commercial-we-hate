"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import navLinks from "@/constants/navLinks";
import { Routes } from "@/constants/routes";

import Logo from "../logo";
import ThemeSwitcher from "../theme-switcher";
import { Button } from "../ui/button";
import AuthButtons from "./auth-buttons";
import MobileMenu from "./mobile-menu";
import ModeSwitcher from "./mode-switcher";

const SiteHeader2 = () => {
  const pathname = usePathname();
  return (
    <header className="bg-background sticky top-0 z-50 flex w-full items-center border-b border-border py-2">
      <div className="flex h-(--header-height) w-full items-center  justify-between gap-2 container-2">
        <div className="flex-1 shrink-0">
          <Logo className="shrink-0" />
        </div>

        <div className="gap-4 flex items-center">
          <div className="gap-10 flex items-center">
            <div className="hidden xl:flex items-center flex-wrap gap-x-7 gap-y-1 xl:gap-x-12">
              {navLinks.map((item) => (
                <Link
                  key={item.id}
                  href={item.href}
                  className={cn(
                    "!text-sm+ font-semibold leading-6 text-primary-dark transition-colors duration-300 relative hover:text-primary before:w-0 before:h-0.5 before:bg-primary before:-bottom-0.5 before:absolute before:left-0 hover:before:w-full before:transition-all before:duration-300",
                    pathname === item.href && "text-primary"
                  )}
                >
                  {item.title}
                </Link>
              ))}
            </div>

            <Link
              href={Routes.HOME}
              className="hidden md:block"
            >
              <Button>Visit Website</Button>
            </Link>
          </div>
          <AuthButtons hideCreatePost={true} />
          <ModeSwitcher />
          <MobileMenu className="md:hidden" />
          <ThemeSwitcher />
        </div>
      </div>
    </header>
  );
};

export default SiteHeader2;

