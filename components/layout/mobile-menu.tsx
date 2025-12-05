import { Menu } from "lucide-react";

import { cn } from "@/lib/utils";

import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

import Logo from "../logo";
import { Button } from "../ui/button";
import AppSidebarContent from "./app-sidebar-content";

const MobileMenu = ({ className }: { className?: string }) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className={cn("flex md:hidden border-gray-400", className)}
        >
          <Menu className="text-gray-400" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetTitle></SheetTitle>
        <Logo />
        <AppSidebarContent className="pt-0 md:pt-5 flex-1 max-md:-ml-3" />
      </SheetContent>
    </Sheet>
  );
};

export default MobileMenu;

