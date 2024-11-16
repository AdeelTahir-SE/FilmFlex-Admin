import React from "react";
import Link from "next/link";

export default function AdminFooter() {
  return (
    <footer className="bg-gray-950 p-6 text-white pt-3 bottom-0 relative ">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-700">Admin Panel</h2>
          <p className="text-gray-400 mb-4">
            Manage your platform efficiently with access to all administrative tools and resources.
          </p>
          <div className="text-sm">
            &copy; {new Date().getFullYear()} Film Flex Admin. All rights reserved.
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-4 text-red-700">Admin Links</h2>
          <ul className="space-y-2">
            <li>
              <Link href="/admin/dashboard" className="text-gray-400 hover:text-white">
                Dashboard
              </Link>
            </li>
            <li>
              <Link href="/admin/users" className="text-gray-400 hover:text-white">
                User Management
              </Link>
            </li>
            <li>
              <Link href="/admin/reports" className="text-gray-400 hover:text-white">
                Reports
              </Link>
            </li>
            <li>
              <Link href="/admin/settings" className="text-gray-400 hover:text-white">
                Settings
              </Link>
            </li>
          </ul>
        </div>

        {/* Admin Notifications */}
        <div>
          <h2 className="text-xl font-bold mb-4 text-red-700">Notifications</h2>
          <p className="text-gray-400 mb-4">
            Stay informed about system updates and alerts.
          </p>
          <form className="flex flex-col space-y-2">
            <input
              type="email"
              placeholder="Enter your email for alerts"
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
      </div>
    </footer>
  );
}
