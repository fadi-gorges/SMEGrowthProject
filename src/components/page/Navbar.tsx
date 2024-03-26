"use client";

import { Icons, IMGIconProps } from "@/components/Icons";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils/cn";
import { checkRole } from "@/payload/collections/Users/checkRole";
import { useAuth } from "@/providers/auth";
import {
  HomeIcon,
  LockKeyholeIcon,
  LogInIcon,
  LogOutIcon,
  LucideIcon,
  MenuIcon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { AnchorHTMLAttributes, useMemo, useState } from "react";
import { isMobile } from "react-device-detect";
import { toast } from "sonner";

type Link = {
  text?: string;
  link: string;
  icon: LucideIcon | React.ComponentType<IMGIconProps>;
};

export const navLinks = {
  home: { text: "Home", link: "/", icon: HomeIcon },
  admin: { text: "Admin Panel", link: "/admin", icon: LockKeyholeIcon },
};

const hiddenPaths = ["/admin"];

const Navbar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const userIsAdmin = useMemo(
    () => (user ? checkRole(["admin"], user) : false),
    [user]
  );

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("You have logged out successfully.");
    router.push("/");
    router.refresh();
    setDrawerOpen(false);
    setLogoutDialogOpen(false);
  };

  const accountDropdown = user && (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="hidden lg:inline-flex h-10 w-10 rounded-full"
        >
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="rounded-full"
                >
                  <Avatar>
                    <AvatarImage
                      src={user.picture.url as string}
                      alt={user.firstName}
                    />
                    <AvatarFallback>
                      <UserIcon />
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Account</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="center" forceMount>
        <DropdownMenuLabel className="flex flex-col">
          <small>
            {user.firstName} {user.lastName}
          </small>
          <small className="text-xs font-normal text-muted-foreground">
            {user.email}
          </small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {userIsAdmin && (
            <DropdownMenuItem asChild>
              <Link href="/admin" className="flex items-center gap-2">
                <LockKeyholeIcon size={16} />
                Admin Panel
              </Link>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        {/* <DropdownMenuSeparator /> */}
        <DropdownMenuItem
          onClick={() => setLogoutDialogOpen(true)}
          className="flex items-center gap-2"
        >
          <LogOutIcon size={16} />
          Log Out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );

  const logoutDialog =
    user &&
    (isMobile ? (
      <Drawer open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Log Out</DrawerTitle>
            <DrawerDescription>
              Are you sure you want to log out?
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
            <DrawerClose>
              <Button
                variant="outline"
                onClick={() => setLogoutDialogOpen(false)}
                className="w-full"
              >
                Cancel
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    ) : (
      <AlertDialog open={logoutDialogOpen} onOpenChange={setLogoutDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              <h6>Log Out</h6>
            </AlertDialogTitle>
            <AlertDialogDescription>
              <p>Are you sure you want to log out?</p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setLogoutDialogOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button variant="destructive" onClick={handleLogout}>
              Log Out
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    ));

  const navDrawer = (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col gap-6 pt-10">
        <SheetHeader>
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className="text-center">
                <h5 className="font-bold">SME@UTS</h5>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-4">
          <NavLink link={navLinks.home} drawerLink />
          {userIsAdmin && <NavLink link={navLinks.admin} drawerLink />}
        </div>
        {!user ? (
          <SheetClose asChild>
            <Link
              href="/auth"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              <h6>Log in</h6>
              <LogInIcon />
            </Link>
          </SheetClose>
        ) : (
          <Button
            variant="default"
            onClick={() => setLogoutDialogOpen(true)}
            className="w-full"
          >
            <h6>Log out</h6>
            <LogOutIcon />
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );

  if (hiddenPaths.some((path) => pathname?.startsWith(path))) return null;

  return (
    <nav className="fixed w-full bg-background border-b z-40">
      <div className="page-container px-4 py-2 lg:py-4 flex gap-2 items-center justify-between">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          <Icons.icon size={30} />
        </Link>
        <div className="flex items-center gap-3">
          {user ? (
            accountDropdown
          ) : (
            <Link
              href="/auth"
              className={buttonVariants({
                variant: "outline",
                className: "hidden lg:inline-flex",
              })}
            >
              Log In
              <LogInIcon size={16} />
            </Link>
          )}
          <ModeToggle />
          {navDrawer}
        </div>
      </div>
      {logoutDialog}
    </nav>
  );
};

const NavLink = ({
  link,
  drawerLink = false,
  className,
  ...props
}: {
  link: Link;
  drawerLink?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const pathname = usePathname();
  const isActive = useMemo(
    () =>
      !link.text ||
      (link.link === "/"
        ? pathname === link.link
        : pathname?.startsWith(link.link)),
    [pathname, link]
  );

  return drawerLink ? (
    <SheetClose asChild>
      <Link
        href={link.link}
        className={cn(
          "flex justify-start items-center gap-4",
          isActive
            ? "text-primary dark:text-foreground font-bold"
            : "text-muted-foreground",
          className
        )}
        {...props}
      >
        <link.icon size={24} />
        <h6>{link.text}</h6>
      </Link>
    </SheetClose>
  ) : (
    <Link
      href={link.link}
      className={cn(
        buttonVariants({
          variant: "ghost",
          size: link.text ? "sm" : "icon",
          className: cn(
            "hidden lg:inline-flex",
            link.text && "px-3",
            isActive ? "font-semibold" : "text-muted-foreground",
            className
          ),
        })
      )}
      {...props}
    >
      {link.text ? <p>{link.text}</p> : <link.icon size={30} />}
    </Link>
  );
};

export default Navbar;
