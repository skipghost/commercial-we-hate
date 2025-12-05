"use client";

import { SignedIn } from "@clerk/nextjs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import { SidebarGroup, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "@/components/ui/sidebar";

import { NavLink } from "@/types";

const SidebarNavItem = ({ title, icon, url }: NavLink) => {
  const pathname = usePathname();

  const isActive = pathname === url;
  return (
    <SidebarMenuItem key={title}>
      <SidebarMenuButton
        asChild
        className={cn("px-4 py-2.5 h-auto", isActive && "bg-neutral-200/70 hover:bg-neutral-200/70")}
      >
        <Link
          href={url!}
          className="gap-3"
        >
          {icon && (
            <FontAwesomeIcon
              icon={icon}
              className={cn(
                "w-[1.1rem] h-[1.1rem] text-text-title transition-all duration-300",
                isActive && "text-primary"
              )}
            />
          )}
          <span className={cn(isActive && "text-black")}>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
const PrimaryNavLinks = ({ links }: { links: NavLink[] }) => {
  return (
    <SidebarGroup>
      <SidebarMenu className="gap-2">
        {links.map((link) => {
          return link.private ? (
            <SignedIn key={link.title}>
              <SidebarNavItem {...link} />
            </SignedIn>
          ) : (
            <SidebarNavItem
              {...link}
              key={link.title}
            />
          );
        })}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default PrimaryNavLinks;

