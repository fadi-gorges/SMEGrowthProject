"use client";
import { NavLinkItem } from "@/components/navbar/NavLink";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerMenuItem,
  DrawerTitle,
  DrawerTrigger,
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
import { Separator } from "@/components/ui/separator";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useAuth } from "@/providers/auth";
import {
  LockKeyholeIcon,
  LogOutIcon,
  SettingsIcon,
  UserCircle2Icon,
  UserIcon,
} from "lucide-react";
import Link from "next/link";
import { isMobile } from "react-device-detect";

const accountLinks = {
  account: { text: "My Account", link: "/account", icon: UserCircle2Icon },
  settings: {
    text: "Account Settings",
    link: "/account/settings",
    icon: SettingsIcon,
  },
  admin: { text: "Admin Panel", link: "/admin", icon: LockKeyholeIcon },
};

const AccountLink = ({
  type,
  link,
}: {
  type: "drawer" | "dropdown";
  link: NavLinkItem;
}) => {
  if (type === "drawer")
    return (
      <DrawerMenuItem asChild>
        <Link href={link.link} className="py-1 flex items-center gap-3">
          <link.icon size={20} />
          {link.text}
        </Link>
      </DrawerMenuItem>
    );

  return (
    <DropdownMenuItem asChild>
      <Link href={link.link} className="flex items-center gap-2">
        <link.icon size={16} />
        {link.text}
      </Link>
    </DropdownMenuItem>
  );
};

const AccountDropdown = ({
  setLogoutDialogOpen,
}: {
  setLogoutDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const { user, isAdmin } = useAuth();

  if (!user) return null;

  const accountButton = (
    <Button variant="ghost" className="h-10 w-10 rounded-full">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
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
  );

  return isMobile ? (
    <Drawer>
      <DrawerTrigger asChild>{accountButton}</DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle className="text-start">
            {user.firstName} {user.lastName}
          </DrawerTitle>
          <DrawerDescription className="text-start">
            {user.email}
          </DrawerDescription>
        </DrawerHeader>
        <Separator />
        <DrawerFooter>
          <AccountLink type="drawer" link={accountLinks.account} />
          <AccountLink type="drawer" link={accountLinks.settings} />
          {isAdmin && <AccountLink type="drawer" link={accountLinks.admin} />}
        </DrawerFooter>
        <Separator />
        <DrawerFooter>
          <DrawerMenuItem onClick={() => setLogoutDialogOpen(true)}>
            <LogOutIcon size={16} />
            Log Out
          </DrawerMenuItem>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{accountButton}</DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel className="flex flex-col">
          <p>
            {user.firstName} {user.lastName}
          </p>
          <small className="font-normal text-muted-foreground">
            {user.email}
          </small>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <AccountLink type="dropdown" link={accountLinks.account} />
          <AccountLink type="dropdown" link={accountLinks.settings} />
          {isAdmin && <AccountLink type="dropdown" link={accountLinks.admin} />}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
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
};

export default AccountDropdown;
