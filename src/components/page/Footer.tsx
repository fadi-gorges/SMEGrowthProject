"use client";
import { Icons } from "@/components/Icons";
import { usePathname } from "next/navigation";

const hiddenPaths = ["/admin"];

const Footer = () => {
  const pathname = usePathname() ?? "";

  if (hiddenPaths.some((path) => pathname.startsWith(path))) return null;

  return (
    <footer className="bg-foreground/5 py-4 md:py-8">
      <div className="page-container flex justify-between items-start">
        <div className="flex items-center gap-y-2 gap-x-4">
          <Icons.icon size={36} />
          <small className="md:text-base">
            AusBizGrowth <br />
            <i className="text-muted-foreground">Slogan here</i>
          </small>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
