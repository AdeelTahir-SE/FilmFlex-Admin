"use client"

import React, { useState, useEffect } from 'react';
import { FaUser, FaEnvelope, FaFilm } from 'react-icons/fa';

export default function UsersPage() {
  const [users, setUsers] = useState([
    {
      "id": 1,
      "name": "John Doe",
      "email": "john.doe@example.com",
      "reservations": ["Movie A", "Movie B", "Movie C"]
    },
    {
      "id": 2,
      "name": "Jane Smith",
      "email": "jane.smith@example.com",
      "reservations": ["Movie X", "Movie Y"]
    },
    {
      "id": 3,
      "name": "Alice Johnson",
      "email": "alice.johnson@example.com",
      "reservations": ["Movie L", "Movie M", "Movie N", "Movie O"]
    },
    {
      "id": 4,
      "name": "Bob Brown",
      "email": "bob.brown@example.com",
      "reservations": ["Movie P", "Movie Q"]
    },
    {
      "id": 5,
      "name": "Charlie Davis",
      "email": "charlie.davis@example.com",
      "reservations": ["Movie R"]
    }
  ]);

  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data);
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  return (
    <div className="container  p-6 bg-black min-h-screen">
      <h1 className="text-6xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
        Users
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-slate-900 text-white shadow-lg rounded-lg p-6">
          <h2 className="text-2xl font-bold mb-4 text-red-600">User List</h2>
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
        </div>
        {selectedUser && (
          <div className="bg-black text-white shadow-lg rounded-lg p-6">
            <h2 className="text-2xl font-bold mb-4 text-red-600">User Details</h2>
            <p className="flex items-center mb-2"><FaUser className="mr-2" /><strong>Name:</strong> {selectedUser.name}</p>
            <p className="flex items-center mb-2"><FaEnvelope className="mr-2" /><strong>Email:</strong> {selectedUser.email}</p>
            <p className="flex items-center"><FaFilm className="mr-2" /><strong>Reservations:</strong> {selectedUser.reservations.join(', ')}</p>
          </div>
        )}
      </div>
    </div>
  );
}
