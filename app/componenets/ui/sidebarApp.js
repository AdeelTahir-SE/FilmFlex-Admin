"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./sidebar";
import { LayoutDashboardIcon, Settings, UserIcon, Film, TicketIcon, Bell } from "lucide-react";
import { cn } from "@/lib/utils";

export function SidebarApp({ children }) {
  const links = [
    { label: "Dashboard", href: "/Dashboard", icon: <LayoutDashboardIcon /> },
    { label: "Movies", href: "/Movies", icon: <Film /> },
    { label: "Reservations", href: "/Reservations", icon: <TicketIcon /> },
    { label: "Users", href: "/Users", icon: <UserIcon /> },
    { label: "Notifications", href: "/Notifications", icon: <Bell /> },
    { label: "Settings", href: "/Settings", icon: <Settings /> },
  ];

  const [open, setOpen] = useState(false);

  return (
    <div
      className={cn(
        "rounded-md flex flex-col fixed md:flex-row w-full flex-1 mx-auto border border-neutral-200 dark:border-neutral-700",
        "h-[100vh]"
      )}
    >
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10 bg-slate-950">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden hide-scrollbar">
            <div className="mt-8 flex flex-col gap-2">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} className="list-none invert font-bold" />
              ))}
            </div>

            {/* Footer Content - Subscriptions and Description */}
            {open&&<div className="mt-8 p-4 border-t border-gray-700 text-gray-400">
              <h2 className="text-xl font-bold mb-4 text-red-700">Admin Panel</h2>
              <p className="mb-4">
                Manage your platform efficiently with access to all administrative tools and resources.
              </p>

              <h2 className="text-xl font-bold mb-4 text-red-700">Subscribe for Alerts</h2>
              <form className="flex flex-col space-y-2">
                <input
                  type="email"
                  placeholder="Enter your email"
                  id="admin-email"
                  className="p-2 rounded bg-gray-700 text-white"
                  required
                />
                <button
                  type="submit"
                  className="p-2 bg-red-600 rounded text-white font-bold hover:bg-red-700"
                >
                  Subscribe
                </button>
              </form>
            </div>
}
          </div>
        </SidebarBody>
      </Sidebar>

      <div className="flex-1 overflow-y-auto hide-scrollbar">{children}</div>
    </div>
  );
}
