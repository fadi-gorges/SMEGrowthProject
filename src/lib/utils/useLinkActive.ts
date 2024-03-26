import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const useLinkActive = (link: string) => {
  const pathname = usePathname();
  return useMemo(
    () => (link === "/" ? pathname === link : pathname?.startsWith(link)),
    [pathname]
  );
};
