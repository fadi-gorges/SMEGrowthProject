"use client";
import { cn } from "@/lib/utils/cn";
import { useAuth } from "@/providers/auth";
import { usePathname } from "next/navigation";
import React from "react";

export const Utils = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  return (
    <div
      className={cn(
        "flex flex-col min-h-screen min-h-svh",
        pathname?.startsWith("/admin") ? "" : "bg-background text-foreground"
      )}
    >
      {children}
    </div>
  );
};
