"use client";
import { cn } from "@/lib/utils/cn";
import { usePathname } from "next/navigation";
import React from "react";

export const Utils = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div
      className={cn(
        "flex flex-col justify-between min-h-screen min-h-svh gap-10",
        pathname?.startsWith("/admin") ? "" : "bg-background text-foreground"
      )}
    >
      {children}
    </div>
  );
};
