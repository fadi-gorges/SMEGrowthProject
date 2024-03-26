"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { useAuth } from "@/providers/auth";
import { usePathname } from "next/navigation";
import React from "react";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  const pathname = usePathname();
  const { user } = useAuth();

  return user && !pathname?.startsWith("/admin") ? (
    <div className="flex-1 grid grid-cols-12">
      <Sidebar />
      <ScrollArea className="col-span-12 lg:col-span-9 2xl:col-span-10 flex flex-col max-h-[calc(100vh-64px)]">
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  ) : (
    children
  );
};

export default SidebarLayout;
