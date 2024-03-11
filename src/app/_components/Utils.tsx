"use client";
import { usePathname } from "next/navigation";
import React from "react";

export const Utils = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();

  return (
    <div
      className={
        pathname?.startsWith("/admin")
          ? ""
          : "flex flex-col justify-between min-h-screen min-h-svh gap-10 bg-background text-foreground"
      }
    >
      {children}
    </div>
  );
};
