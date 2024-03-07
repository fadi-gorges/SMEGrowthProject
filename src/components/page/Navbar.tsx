"use client";

import { Icons } from "@/components/Icons";
import { buttonVariants } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/mode-toggle";
import Link from "next/link";
import { usePathname } from "next/navigation";

const hiddenPaths = ["/admin"];

const Navbar = () => {
  const pathname = usePathname();

  if (hiddenPaths.some((path) => pathname?.startsWith(path))) return null;

  return (
    <nav className="fixed w-full border-b z-40">
      <div className="page-container px-4 py-2 lg:py-4 flex gap-2 items-center">
        <Link
          href="/"
          className={buttonVariants({
            variant: "ghost",
            size: "icon",
          })}
        >
          <Icons.icon size={30} />
        </Link>
        <ModeToggle className="ml-auto" />
      </div>
    </nav>
  );
};

export default Navbar;
