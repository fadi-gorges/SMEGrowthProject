"use client";

import { Icons } from "@/components/Icons";
import ResponsiveAlertDialog from "@/components/ResponsiveAlertDialog";
import NavLink from "@/components/navbar/NavLink";
import NavSheet from "@/components/navbar/NavSheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/providers/auth";
import { HomeIcon, InfoIcon, LockKeyholeIcon, LogInIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";

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

  const [isLogoutLoading, setIsLogoutLoading] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    setIsLogoutLoading(true);
    await logout();
    setIsLogoutLoading(false);

    router.push("/");
    router.refresh();
    setSheetOpen(false);
    setLogoutDialogOpen(false);
  };

  const logo = (
    <Link
      href={user ? "/dashboard" : "/"}
      className="h-full flex items-center w-fit gap-3"
    >
      <Icons.icon size={30} />
      <h6 className="font-medium">AusBizGrowth</h6>
    </Link>
  );

  const rightSide = (
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
      <NavSheet
        sheetOpen={sheetOpen}
        setSheetOpen={setSheetOpen}
        setLogoutDialogOpen={setLogoutDialogOpen}
      />
    </>
  );

  if (hiddenPaths.some((path) => pathname?.startsWith(path))) return null;

  return (
    <nav className="sticky top-0 shrink-0 w-full h-16 bg-background/75 backdrop-blur-md border-b z-40">
      {user && (
        <div className="hidden lg:grid grid-cols-12 h-full">
          <div className="col-span-3 2xl:col-span-2 x-padding bg-muted/40 border-r animate-in slide-in-from-left-full">
            {logo}
          </div>
          <div className="col-span-9 2xl:col-span-10 x-padding pl-5 flex justify-end items-center gap-3">
            {rightSide}
          </div>
        </div>
      )}
      <div
        className={cn(
          "x-padding h-full flex items-center gap-8",
          user ? "lg:hidden" : ""
        )}
      >
        {logo}
        <div className="flex-1 flex items-center gap-1">
          <NavLink link={navLinks.home} />
          <NavLink link={navLinks.about} />
        </div>
        <div className="flex items-center gap-2">{rightSide}</div>
      </div>
      <ResponsiveAlertDialog
        title="Log Out"
        description="Are you sure you want to log out?"
        open={logoutDialogOpen}
        setOpen={setLogoutDialogOpen}
      >
        <Button
          variant="destructive"
          loading={isLogoutLoading}
          onClick={handleLogout}
        >
          Log Out
        </Button>
      </ResponsiveAlertDialog>
    </nav>
  );
};

export default Navbar;
