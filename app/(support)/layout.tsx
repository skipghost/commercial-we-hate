import { type Metadata } from "next";

import Footer from "@/components/layout/footer";
import SiteHeader2 from "@/components/layout/site-header-2";
import { SidebarProvider } from "@/components/ui/sidebar";

import { META_DATA } from "@/constants/meta";

export const metadata: Metadata = META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SidebarProvider className="flex flex-col">
      <SiteHeader2 />
      <main className="flex-grow flex flex-col min-h-[600px]">{children}</main>
      <Footer />
    </SidebarProvider>
  );
}

