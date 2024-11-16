"use client";

import NotificationCard from "../Componenets/NotificationCard";
import { useEffect, useState } from "react";

export default function AdminNotificationsPage() {
  const [notifications, setNotifications] = useState([
    {
      "id": 1,
      
      "title": "System Update",
      "message": "A new system update will be deployed on 20th Nov 2024. Please ensure all critical tasks are completed.",
      "time": "5 minutes ago"
    },
    {
      "id": 2,
      
      "title": "New User Registration",
      "message": "A new user, John Doe, has registered on the platform. Review and approve the account in the user management section.",
      "time": "30 minutes ago"
    },
    {
      "id": 3,
      
      "title": "Performance Alert",
      "message": "Server load exceeded 80% in the last hour. Investigate potential causes to ensure stability.",
      "time": "2 hours ago"
    },
    {
      "id": 4,
      
      "title": "Content Report",
      "message": "User Jane Smith has reported inappropriate content on the movie 'Dark Knight'. Review the report and take necessary action.",
      "time": "1 day ago"
    },
    {
      "id": 5,
      
      "title": "Monthly Subscription Update",
      "message": "20 new users have subscribed to premium plans this month. Review the detailed analytics on the dashboard.",
      "time": "3 days ago"
    }
  ]
  );

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
    <div className="bg-black h-full">
      <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-700 to-white text-center py-4 px-6 rounded-lg shadow-lg animate-glow">
        Admin Notifications
      </h1>
      <div className="flex flex-col gap-4 mt-4 px-72">
        {notifications.length > 0 ? (
          notifications.map((element) => (
            <NotificationCard
              key={element.id}
              image={element.image } 
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
