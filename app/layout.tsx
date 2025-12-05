import { ClerkProvider } from "@clerk/nextjs";
import { type Metadata } from "next";
import { Poppins } from "next/font/google";

import { EdgeStoreProvider } from "@/lib/edgestore";
import { cn } from "@/lib/utils";

import { Toaster } from "@/components/ui/sonner";

import { META_DATA } from "@/constants/meta";

import { ModeProvider } from "@/context/ModeContext";
import { ThemeProvider } from "@/context/ThemeContext";

import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});

export const metadata: Metadata = META_DATA;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <ClerkProvider>
        <EdgeStoreProvider>
          <ModeProvider>
            <body
              className={cn("overscroll-none flex flex-col min-h-screen antialiased bg-background", poppins.className)}
            >
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem
                disableTransitionOnChange
              >
                <div className="flex-1 flex flex-col justify-center">{children}</div>
                <Toaster />
              </ThemeProvider>
            </body>
          </ModeProvider>
        </EdgeStoreProvider>
      </ClerkProvider>
    </html>
  );
}

