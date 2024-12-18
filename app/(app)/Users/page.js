"use client";

import React, { useState, useEffect } from "react";
import { FaUser, FaEnvelope, FaFilm } from "react-icons/fa";

export default function UsersPage() {
  const [users, setUsers] = useState([]); // Store user list
  const [selectedUser, setSelectedUser] = useState(null); // Store selected user
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors

  // Fetch users from the API route
  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true); // Start loading
      try {
        const response = await fetch("/api/users"); // API call
        if (!response.ok) throw new Error("Failed to fetch users"); // Check HTTP status
        const data = await response.json(); // Parse JSON response
        setUsers(data); // Update state with user data
      } catch (error) {
        console.error("Error fetching users:", error);
        setError("Failed to load users. Please try again later.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container p-6 bg-black min-h-screen">
      <h1 className="text-6xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
        Users
      </h1>

      {loading ? (
        <p className="text-white text-center">Loading users...</p>
      ) : error ? (
        <p className="text-red-500 text-center">{error}</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User List */}
          <div className="bg-slate-900 text-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-600">User List</h2>
            {users.length > 0 ? (
              <ul>
                {users.map((user) => (
                  <li
                    key={user.id}
                    className="flex items-center p-3 border-b border-gray-700 cursor-pointer hover:bg-red-800 hover:text-white transition duration-300"
                    onClick={() => handleUserClick(user)}
                  >
                    <FaUser className="mr-3" />
                    {user.name}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No users found.</p>
            )}
          </div>

          {/* User Details */}
          {selectedUser && (
            <div className="bg-black text-white shadow-lg rounded-lg p-6">
              <h2 className="text-2xl font-bold mb-4 text-red-600">
                User Details
              </h2>
              <p className="flex items-center mb-2">
                <FaUser className="mr-2" />
                <strong>Name:</strong> {selectedUser.name}
              </p>
              <p className="flex items-center mb-2">
                <FaEnvelope className="mr-2" />
                <strong>Email:</strong> {selectedUser.email}
              </p>
              <p className="flex items-center">
                <FaFilm className="mr-2" />
                <strong>Reservations:</strong>{" "}
                {selectedUser.reservations || "No reservations"}
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
