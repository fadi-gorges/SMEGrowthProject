"use client";
import Sidebar from "@/components/sidebar/Sidebar";
import React from "react";

const SidebarLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex-1 grid grid-cols-12">
      <div className="lg:col-span-3 2xl:col-span-2">
        <Sidebar />
      </div>
      <div
        id="page-div"
        className="col-span-12 lg:col-span-9 2xl:col-span-10 flex flex-col"
      >
        {children}
      </div>
    </div>
  );
};

export default SidebarLayout;
