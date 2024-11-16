"use client";

import NotificationCard from "../Componenets/NotificationCard";
import { useEffect, useState } from "react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([]);

  async function fetchNotifications(id) {
    try {
      const response = await fetch(`/api/Notifications/${id}`);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const parsedResult = await response.json();
      setNotifications(parsedResult);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  }

  useEffect(() => {
    fetchNotifications(2);
  }, []);

  return (
    <div className="bg-gray-950 h-full">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-700 to-white text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Admin Notifications
      </h1>
      <div className="flex flex-col gap-4 mt-4 px-72">
        {notifications.length > 0 ? (
          notifications.map((element) => (
            <NotificationCard
              key={element.id}
              image={element.image } // Default image if none provided
              title={element.title}
              message={element.message}
              time={element.time}
              onClose={() => console.log("Closed")}
            />
          ))
        ) : (
          <p className="text-white text-center">No notifications available.</p>
        )}
      </div>
    </div>
  );
}
