"use client";

import { INFO } from "@/constants";

import { useMode } from "@/context/ModeContext";

import { SidebarFooter } from "../ui/sidebar";

const AppSidebarFooter = () => {
  const { mode } = useMode();

  return (
    <SidebarFooter className="text-sm text-center mt-auto">
      {mode && INFO.MODES[mode]?.title}. © 2022. All rights reserved.
    </SidebarFooter>
  );
};

export default AppSidebarFooter;

