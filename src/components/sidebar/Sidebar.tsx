"use client";
import LogoutDialog from "@/components/navbar/LogoutDialog";
import { NavLinkItem } from "@/components/navbar/NavLink";
import { navLinks } from "@/components/navbar/Navbar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils/cn";
import { useLinkActive } from "@/lib/utils/useLinkActive";
import { useAuth } from "@/providers/auth";
import {
  BellIcon,
  Building2Icon,
  HomeIcon,
  LogOutIcon,
  SearchIcon,
  SettingsIcon,
  TextSearchIcon,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnchorHTMLAttributes, useState } from "react";
import { toast } from "sonner";

export const sidebarLinks = {
  dashboard: { text: "Dashboard", link: "/dashboard", icon: HomeIcon },
  simpleSearch: { text: "Simple Search", link: "/search", icon: SearchIcon },
  advancedSearch: {
    text: "Advanced Search",
    link: "/advanced-search",
    icon: TextSearchIcon,
  },
  editBusiness: {
    text: "Edit Business",
    link: "/business",
    icon: Building2Icon,
  },
  notifications: {
    text: "Notifications",
    link: "/notifications",
    icon: BellIcon,
  },
  settings: { text: "Account Settings", link: "/settings", icon: SettingsIcon },
};

const SidebarLink = ({
  link,
  alertCount,
  className,
  ...props
}: {
  link: NavLinkItem;
  alertCount?: number;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const isActive = useLinkActive(link.link);

  return (
    <Link
      href={link.link}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors",
        isActive
          ? "bg-muted text-foreground"
          : "text-muted-foreground hover:text-foreground",
        className
      )}
      {...props}
    >
      <link.icon size={20} />
      <p>{link.text}</p>
      {alertCount && (
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          {alertCount > 99 ? "99+" : alertCount}
        </Badge>
      )}
    </Link>
  );
};

const Sidebar = () => {
  const router = useRouter();
  const { isAdmin, logout } = useAuth();

  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    toast.success("You have logged out successfully.");
    router.push("/");
    router.refresh();
    setLogoutDialogOpen(false);
  };

  return (
    <nav className="hidden lg:flex flex-col lg:col-span-3 2xl:col-span-2 p-4 border-r bg-muted/40 animate-in slide-in-from-left-full">
      <div className="flex-1 flex flex-col gap-1">
        <SidebarLink link={sidebarLinks.dashboard} />
        <SidebarLink link={sidebarLinks.simpleSearch} />
        <SidebarLink link={sidebarLinks.advancedSearch} />
        <SidebarLink link={sidebarLinks.editBusiness} />
        <SidebarLink link={sidebarLinks.notifications} alertCount={6} />
        <SidebarLink link={sidebarLinks.settings} />
        {isAdmin && <SidebarLink link={navLinks.admin} />}
        {/* <Link
        href="#"
        className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground hover:text-primary"
      >
        <ShoppingCart className="h-4 w-4" />
        Orders
        <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
          6
        </Badge>
      </Link> */}
      </div>
      <Button
        variant="default"
        onClick={() => setLogoutDialogOpen(true)}
        className="w-full"
      >
        <LogOutIcon size={20} />
        <p>Log out</p>
      </Button>
      <LogoutDialog
        handleLogout={handleLogout}
        logoutDialogOpen={logoutDialogOpen}
        setLogoutDialogOpen={setLogoutDialogOpen}
      />
    </nav>
  );
};

export default Sidebar;
