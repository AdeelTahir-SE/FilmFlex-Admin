"use client"// pages/users.js
// pages/users.js
import { useState, useEffect } from 'react';

const UsersPage = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchId, setSearchId] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('/api/users'); // Replace with your API route
        if (!response.ok) {
          throw new Error('Failed to fetch users');
        }
        const data = await response.json();
        setUsers(data);
        setFilteredUsers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleSearch = () => {
    if (searchId.trim() === '') {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter(user => user.id.toString() === searchId.trim());
      setFilteredUsers(filtered);
    }
  };

  if (loading) return (
    <div className="text-center bg-black min-h-screen flex justify-center items-center">
      <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
    </div>
  );
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
        User Management</h1>

      {error && (
        <p className="mb-4 text-red-500 text-center p-2 bg-red-900 border border-red-700 rounded">
          {error}
        </p>
      )}
      {filteredUsers.length === 0 && !loading && (
        <p className="mb-4 text-yellow-500 text-center p-2 bg-yellow-900 border border-yellow-700 rounded">
          No users found
        </p>
      )}

      <div className="mb-4 flex justify-center space-x-4">
        <input
          type="text"
          placeholder="Search by ID"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
          className="w-1/2 p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
        />
        <button
          onClick={handleSearch}
          className="p-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          Search
        </button>
      </div>

      <table className="table-auto w-full bg-gray-900 border-collapse border-4 border-gray-800 rounded-full shadow-lg">
        <thead>
          <tr className="bg-red-700 text-white">
            <th className="border border-gray-700 px-4 py-2">Image</th>
            <th className="border border-gray-700 px-4 py-2">Name</th>
            <th className="border border-gray-700 px-4 py-2">Email</th>
            <th className="border border-gray-700 px-4 py-2">User Id</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id} className="bg-gray-800 text-white">
              <td className="border border-gray-700 px-4 py-2">
                <img 
                  src={user.imageUrl} 
                  alt={user.name} 
                  className="w-16 h-16 object-cover rounded-full border border-gray-700" 
                />
              </td>
              <td className="border border-gray-700 px-4 py-2">{user.name}</td>
              <td className="border border-gray-700 px-4 py-2">{user.email}</td>
              <td className="border border-gray-700 px-4 py-2">{user.id}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersPage;
