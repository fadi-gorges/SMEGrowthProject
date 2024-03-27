"use client";

import { Icons } from "@/components/Icons";
import LogoutDialog from "@/components/navbar/LogoutDialog";
import NavLink from "@/components/navbar/NavLink";
import NavSheet from "@/components/navbar/NavSheet";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/providers/auth";
import { HomeIcon, InfoIcon, LockKeyholeIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

export const navLinks = {
  home: { text: "Home", link: "/", icon: HomeIcon },
  about: { text: "About", link: "/about", icon: InfoIcon },
  admin: { text: "Admin Panel", link: "/admin", icon: LockKeyholeIcon },
};

const hiddenPaths = ["/admin"];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [sheetOpen, setSheetOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("You have logged out successfully.");
    router.push("/");
    router.refresh();
    setSheetOpen(false);
    setLogoutDialogOpen(false);
  };

  const navSheetAndLogo = (
    <>
      <NavSheet
        sheetOpen={sheetOpen}
        setSheetOpen={setSheetOpen}
        setLogoutDialogOpen={setLogoutDialogOpen}
      />
      <Link href="/" className="flex items-center w-fit gap-3">
        <Icons.icon size={30} />
        <h6 className="font-medium">AusBizGrowth</h6>
      </Link>
    </>
  );

  const loginAndDarkMode = (
    <>
      {!user && (
        <Link
          href="/auth"
          className={cn(
            buttonVariants({
              variant: "outline",
            }),
            "hidden lg:inline-flex"
          )}
        >
          Log In
          <LogInIcon size={16} />
        </Link>
      )}
      <ModeToggle />
    </>
  );

  if (hiddenPaths.some((path) => pathname?.startsWith(path))) return null;

  return (
    <nav className="sticky top-0 shrink-0 w-full h-16 bg-background/75 backdrop-blur-md border-b z-40">
      {user && (
        <div className="hidden lg:grid grid-cols-12 h-full">
          <div className="col-span-3 2xl:col-span-2 x-padding flex items-center bg-muted/40 border-r animate-in slide-in-from-left-full">
            {navSheetAndLogo}
          </div>
          <div className="col-span-9 2xl:col-span-10 x-padding pl-5 flex justify-end items-center gap-3">
            {loginAndDarkMode}
          </div>
        </div>
      )}
      <div
        className={cn(
          "x-padding h-full flex items-center gap-8",
          user ? "lg:hidden" : ""
        )}
      >
        <div className="flex items-center gap-3">{navSheetAndLogo}</div>
        <div className="flex-1 flex items-center gap-1">
          <NavLink link={navLinks.home} />
          <NavLink link={navLinks.about} />
        </div>
        <div className="flex items-center gap-2">{loginAndDarkMode}</div>
      </div>
      <LogoutDialog
        logoutDialogOpen={logoutDialogOpen}
        setLogoutDialogOpen={setLogoutDialogOpen}
        handleLogout={handleLogout}
      />
    </nav>
  );
};

export default Navbar;
