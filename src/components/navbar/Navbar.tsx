"use client";

import { IMGIconProps, Icons } from "@/components/Icons";
import ResponsiveAlertDialog from "@/components/ResponsiveAlertDialog";
import NavSheet from "@/components/navbar/NavSheet";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useLinkActive } from "@/lib/utils/useLinkActive";
import { useAuth } from "@/providers/auth";
import {
  HomeIcon,
  InfoIcon,
  LockKeyholeIcon,
  LogInIcon,
  LogOutIcon,
  LucideIcon,
  UserPlus2Icon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, useState } from "react";

export const navLinks = {
  home: { text: "Home", link: "/", icon: HomeIcon },
  about: { text: "About", link: "/about", icon: InfoIcon },
  admin: { text: "Admin Panel", link: "/admin", icon: LockKeyholeIcon },
  login: { text: "Log in", link: "/auth/login", icon: LogInIcon },
};

const hiddenPaths = ["/admin"];

export type NavLinkItem = {
  text?: string;
  link: string;
  icon: LucideIcon | React.ComponentType<IMGIconProps>;
};

const NavLink = ({
  link,
  className,
  ...props
}: {
  link: NavLinkItem;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isActive = useLinkActive(link.link);

  return (
    <Link
      href={link.link}
      className={cn(
        buttonVariants({
          variant: "ghost",
          className: cn(
            "hidden lg:inline-flex",
            isActive ? "font-semibold" : "text-muted-foreground",
            className
          ),
        })
      )}
      {...props}
    >
      <p>{link.text}</p>
    </Link>
  );
};

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

  if (hiddenPaths.some((path) => pathname?.startsWith(path))) return null;

  return (
    <nav className="sticky top-0 shrink-0 w-full h-16 bg-background/75 backdrop-blur-md border-b z-40">
      <div className="x-padding h-full flex items-center gap-8">
        {logo}
        <div className="flex-1 flex justify-end items-center gap-2 lg:gap-4">
          {user ? (
            <Button
              variant="outline"
              onClick={() => setLogoutDialogOpen(true)}
              className="hidden lg:inline-flex"
            >
              <LogOutIcon size={16} />
              Log out
            </Button>
          ) : (
            <>
              <NavLink link={navLinks.home} />
              <NavLink link={navLinks.about} />

              <NavLink link={navLinks.login} />
              <Link
                href="/auth/signup"
                className={buttonVariants({ size: "sm" })}
              >
                <UserPlus2Icon size={16} />
                Sign up
              </Link>
            </>
          )}
          <NavSheet
            sheetOpen={sheetOpen}
            setSheetOpen={setSheetOpen}
            setLogoutDialogOpen={setLogoutDialogOpen}
          />
        </div>
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
