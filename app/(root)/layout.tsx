import { type Metadata } from "next";

import AppSidebar from "@/components/layout/app-sidebar";
import SiteHeader from "@/components/layout/site-header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";

import { META_DATA } from "@/constants/meta";

export const metadata: Metadata = META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="[--header-height:calc(--spacing(14))] flex-1 flex flex-col">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="flex flex-1 flex-col px-4 md:pl-12 md:pr-10 py-6 max-w-6xl mx-auto w-full">{children}</div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  );
}

