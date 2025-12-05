"use client";

import * as React from "react";

import { SidebarIcon } from "lucide-react";

import { Sidebar, useSidebar } from "@/components/ui/sidebar";

import { Button } from "../ui/button";
import AppSidebarContent from "./app-sidebar-content";

const AppSidebar = ({ ...props }: React.ComponentProps<typeof Sidebar>) => {
  const { toggleSidebar } = useSidebar();
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]! container"
      {...props}
    >
      <Button
        className="h-4 w-4 absolute right-0 translate-x-1/2 top-40 border border-border text-text-title rounded-full p-4 z-[1] bg-white dark:bg-ghost"
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
      >
        <SidebarIcon className="w-5 h-5" />
      </Button>
      <AppSidebarContent />
    </Sidebar>
  );
};

export default AppSidebar;

