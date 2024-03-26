import type { NavLinkItem } from "@/components/navbar/NavLink";
import { navLinks } from "@/components/navbar/Navbar";
import { sidebarLinks } from "@/components/sidebar/Sidebar";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";
import { useLinkActive } from "@/lib/utils/useLinkActive";
import { useAuth } from "@/providers/auth";
import { LogInIcon, LogOutIcon, MenuIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnchorHTMLAttributes } from "react";

export const SheetLink = ({
  link,
  className,
  ...props
}: {
  link: NavLinkItem;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const pathname = usePathname();
  const isActive = useLinkActive(link.link);

  return (
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
  );
};

const NavSheet = ({
  sheetOpen: drawerOpen,
  setSheetOpen: setDrawerOpen,
  setLogoutDialogOpen,
}: {
  sheetOpen: boolean;
  setSheetOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setLogoutDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, isAdmin } = useAuth();

  return (
    <Sheet open={drawerOpen} onOpenChange={setDrawerOpen}>
      <SheetTrigger asChild>
        <Button size="icon" variant="ghost" className="lg:hidden">
          <MenuIcon size={24} />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col gap-6 pt-10">
        <SheetHeader>
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link href="/" className="text-center">
                <h5 className="font-bold">AusBizGrowth</h5>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>
        <div className="flex-1 space-y-4">
          {user ? (
            <>
              <SheetLink link={sidebarLinks.dashboard} />
              <SheetLink link={sidebarLinks.simpleSearch} />
              <SheetLink link={sidebarLinks.advancedSearch} />
              <SheetLink link={sidebarLinks.editBusiness} />
              <SheetLink link={sidebarLinks.settings} />
              {isAdmin && <SheetLink link={navLinks.admin} />}
            </>
          ) : (
            <>
              <SheetLink link={navLinks.home} />
              <SheetLink link={navLinks.about} />
            </>
          )}
        </div>
        {!user ? (
          <SheetClose asChild>
            <Link
              href="/auth"
              className={cn(buttonVariants({ variant: "default" }), "w-full")}
            >
              <LogInIcon size={20} />
              <h6>Log in</h6>
            </Link>
          </SheetClose>
        ) : (
          <Button
            variant="default"
            onClick={() => setLogoutDialogOpen(true)}
            className="w-full"
          >
            <LogOutIcon size={20} />
            <h6>Log out</h6>
          </Button>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default NavSheet;
