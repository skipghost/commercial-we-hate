"use client";

import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import {
  faBook,
  faClipboardList,
  faClipboardQuestion,
  faFire,
  faGlobe,
  faHome,
  faMapPin,
  faPlus,
  faTv,
  faUserShield,
  faVolumeUp,
} from "@fortawesome/free-solid-svg-icons";

import { cn } from "@/lib/utils";

import { SidebarContent } from "@/components/ui/sidebar";

import { Routes } from "@/constants/routes";

import { NavLink } from "@/types";

import { Separator } from "../ui/separator";
import AppSidebarFooter from "./app-sidebar-footer";
import PrimaryNavLinks from "./primary-nav-links";
import SecondaryNavLinks from "./secondary-nav-links";

const sidebarLinks: Record<"primary" | "secondary", NavLink[]> = {
  primary: [
    { title: "Home", url: "/", icon: faHome, isActive: true },
    { title: "Bulletin Board", url: `${Routes.TOPICS}/bulletin-board`, icon: faClipboardList },
    { title: "Popular", url: `${Routes.TOPICS}/popular`, icon: faFire },
    { title: "National Commercials", url: `${Routes.TOPICS}/national-commercials`, icon: faGlobe },
    { title: "YouTube Commercials", url: `${Routes.TOPICS}/youtube-commercials`, icon: faYoutube },
    { title: "Local Commercials", url: `${Routes.TOPICS}/local-commercials`, icon: faMapPin },
    { title: "Audio Commercials", url: `${Routes.TOPICS}/audio-commercials`, icon: faVolumeUp },
    { title: "Classic Commercials", url: `${Routes.TOPICS}/classic-commercials`, icon: faTv },
    { title: "Admin Selections", url: `${Routes.TOPICS}/admin-selections`, icon: faUserShield },
    { title: "Create", url: `${Routes.CREATE_POST}`, icon: faPlus, private: true },
  ],
  secondary: [
    {
      title: "Resources",
      isActive: true,
      items: [
        { title: "About Us", url: Routes.ABOUT_US, icon: faBook },
        { title: "Help", url: Routes.HELP, icon: faClipboardQuestion },
      ],
    },
  ],
};

interface AppSidebarContentProps {
  className?: string;
}

const AppSidebarContent = ({ className }: AppSidebarContentProps) => {
  return (
    <>
      <SidebarContent className={cn("pt-28", className)}>
        <PrimaryNavLinks links={sidebarLinks.primary} />
        <Separator />
        <SecondaryNavLinks links={sidebarLinks.secondary} />
      </SidebarContent>
      <AppSidebarFooter />
    </>
  );
};

export default AppSidebarContent;

