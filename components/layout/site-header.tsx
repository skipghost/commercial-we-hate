"use client";

import Logo from "../logo";
import ThemeSwitcher from "../theme-switcher";
import SearchInput from "./SearchInput";
import AuthButtons from "./auth-buttons";
import MobileMenu from "./mobile-menu";
import ModeSwitcher from "./mode-switcher";

const SiteHeader = () => {
  return (
    <>
      <header className="bg-background sticky container top-0 z-50 flex w-full items-center border-border border-b py-2">
        <div className="flex h-(--header-height) w-full items-center justify-between gap-2 ">
          <div className="flex items-center gap-10 shrink-0">
            <Logo />
            <SearchInput className="hidden md:block" />
          </div>

          <div className="flex gap-4 items-center">
            <AuthButtons className="hidden md:flex" />
            <ModeSwitcher />
            <ThemeSwitcher />
          </div>
        </div>
      </header>
      <div className="flex md:hidden container pt-4 pb-4 gap-4">
        <SearchInput className="md:hidden w-full" />
        <div className="flex gap-4 items-center">
          <AuthButtons className="md:hidden" />
          <MobileMenu className="md:hidden" />
        </div>
      </div>
    </>
  );
};

export default SiteHeader;

