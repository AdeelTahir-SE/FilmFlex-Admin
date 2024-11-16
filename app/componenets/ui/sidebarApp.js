"use client";
import React, { useState } from "react";
import { Sidebar,SidebarBody,SidebarLink } from "./sidebar";
import { LayoutDashboardIcon  } from "lucide-react";
import { Settings  } from "lucide-react";
import { UserIcon } from "lucide-react";
import { Film } from "lucide-react";
import { TicketIcon } from "lucide-react";
import { Bell  } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

export  function SidebarApp({children}) {
    const links = [
        {
          label: "Dashboard",
          href: "/admin/dashboard",
          icon: (
            <li className="hover:bg-slate-600 hover:cursor-pointer">
              <LayoutDashboardIcon />
            </li>
          ),
        },
        {
          label: "Movies",
          href: "/admin/movies",
          icon: (
            <li className="hover:bg-slate-600 hover:cursor-pointer">
              <Film />
            </li>
          ),
        },
        {
          label: "Reservations",
          href: "/admin/reservations",
          icon: (
            <li className="hover:bg-slate-600 hover:cursor-pointer">
              <TicketIcon />
            </li>
          ),
        },
        {
          label: "Users",
          href: "/admin/users",
          icon: (
            <li className="hover:bg-slate-600 hover:cursor-pointer">
              <UserIcon />
            </li>
          ),
        },
        {
          label: "Notifications",
          href: "/admin/notifications",
          icon: (
            <li className="hover:bg-slate-600 hover:cursor-pointer">
              <Bell />
            </li>
          ),
        },
        {
          label: "Settings",
          href: "/admin/settings",
          icon: (
            <li className="hover:bg-slate-600 hover:cursor-pointer">
              <Settings />
            </li>
          ),
        },
      ];
  const [open, setOpen] = useState(false);
  return (
    (<div
      className={cn(
        "rounded-md flex flex-col fixed md:flex-row  w-full flex-1  mx-auto border border-neutral-200 dark:border-neutral-700 overflow-auto ",
        "h-[100vh]"
      )}>
      <Sidebar open={open} setOpen={setOpen} >
        <SidebarBody className="justify-between gap-10 bg-slate-950 *:filter *:invert">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="list-none font-bold" />
              ))}
            </div>
          </div>
          <div>
         
          </div>
        </SidebarBody>
      </Sidebar>
      <div className="flex-1 overflow-y-auto">
      {children}
    </div>
    </div>)
  );
}





