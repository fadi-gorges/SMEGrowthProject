import SidebarLayout from "@/app/_components/SidebarLayout";
import { Utils } from "@/app/_components/Utils";
import Navbar from "@/components/navbar/Navbar";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils/cn";
import { AuthProvider } from "@/providers/auth";
import "@/styles/globals.css";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    template: "%s • AusBizGrowth",
    default: "AusBizGrowth",
  },
  description: "",

  viewport: {
    width: "device-width",
    initialScale: 1,
    minimumScale: 1,
    maximumScale: 1,
  },
};

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body
        className={cn(
          "relative antialiased overflow-x-hidden",
          inter.className
        )}
      >
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <AuthProvider>
            <Utils>
              <Navbar />
              <SidebarLayout>{children}</SidebarLayout>
              {/* <Footer /> */}
            </Utils>
            <Toaster richColors closeButton />
          </AuthProvider>
        </ThemeProvider>
        <SpeedInsights />
      </body>
    </html>
  );
};

export default RootLayout;
