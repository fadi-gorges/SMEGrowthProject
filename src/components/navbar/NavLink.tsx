import { IMGIconProps } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { SheetClose } from "@/components/ui/sheet";
import { cn } from "@/lib/utils/cn";
import { useLinkActive } from "@/lib/utils/useLinkActive";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { AnchorHTMLAttributes } from "react";

export type NavLinkItem = {
  text?: string;
  link: string;
  icon: LucideIcon | React.ComponentType<IMGIconProps>;
};

const NavLink = ({
  link,
  drawerLink = false,
  className,
  ...props
}: {
  link: NavLinkItem;
  drawerLink?: boolean;
} & AnchorHTMLAttributes<HTMLAnchorElement>) => {
  const pathname = usePathname();
  const isActive = useLinkActive(link.link);

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
          size: "sm",
          className: cn(
            "hidden lg:inline-flex px-3",
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

export default NavLink;
