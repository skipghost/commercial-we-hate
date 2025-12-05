"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";

import { NavLink } from "@/types";

const SecondaryNavLinks = ({ links }: { links: NavLink[] }) => {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarMenu>
        {links.map((item) => (
          <SidebarMenuItem key={item.title}>
            {item.items?.length ? (
              <>
                <div className="px-2 py-2.5 h-auto">
                  <div className={cn("flex justify-between")}>
                    <span>{item.title}</span>
                  </div>
                </div>
                <SidebarMenuSub>
                  {item.items?.map((subItem) => {
                    const isActive = pathname === subItem.url;

                    return (
                      <SidebarMenuSubItem key={subItem.title}>
                        <SidebarMenuButton asChild>
                          <Link
                            href={subItem.url!}
                            className={cn(
                              "px-4 py-2.5 h-auto",
                              isActive && "bg-neutral-200/70 hover:bg-neutral-200/70"
                            )}
                          >
                            {subItem.icon && (
                              <FontAwesomeIcon
                                icon={subItem.icon}
                                className={cn(
                                  "w-[1.1rem] h-[1.1rem] text-text-title transition-all duration-300",
                                  isActive && "!text-black"
                                )}
                              />
                            )}
                            <span className={cn(isActive && "text-black")}>{subItem.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuSubItem>
                    );
                  })}
                </SidebarMenuSub>
              </>
            ) : null}
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
};

export default SecondaryNavLinks;

