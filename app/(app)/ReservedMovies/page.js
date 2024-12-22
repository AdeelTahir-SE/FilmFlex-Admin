"use client"
import React, { useState, useEffect } from "react";
import { FaFilm } from "react-icons/fa";
import { getReservedMovies } from "@/DB/connectFB"; // Import the function

export default function UsersPage() {
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track errors
  const [userMovies, setUserMovies] = useState([]); // Store all reserved movies

  // Fetch reserved movies from Firestore when the component mounts
  useEffect(() => {
    const fetchReservedMovies = async () => {
      setLoading(true);
      try {
        const movies = await getReservedMovies(); // Get all reserved movies
        setUserMovies(movies); // Set the reserved movies
      } catch (error) {
        console.error("Error fetching reserved movies:", error);
        setError("Failed to load reserved movies. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchReservedMovies(); // Trigger fetch when component mounts
  }, []); // Empty dependency array means it runs once when the component mounts

  return (
    <div className="container p-6 bg-gradient-to-b from-black via-gray-900 to-black min-h-screen">
      <h1 className="text-6xl text-center font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-700 to-black">
        Reservations
      </h1>

      {loading ? (
        
          <div className="text-center bg-black min-h-screen flex justify-center items-center">
            <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
          </div>
        
      ) : error ? (
        <p className="text-red-500 text-center text-lg bg-red-900 p-4 rounded-lg shadow-lg">{error}</p>
      ) : (
        <div className="bg-gray-900 text-white shadow-2xl rounded-lg p-8">
          <h2 className="text-3xl font-bold mb-6 text-red-500">Reserved Seats</h2>
          {userMovies.length > 0 ? (
            <ul className="space-y-4">
              {userMovies.map((movie, index) => (
                <li key={index} className="p-4 bg-gray-800 rounded-lg shadow-lg border border-gray-700">
                  <div className="flex flex-col space-y-2">
                    <p><strong className="text-red-500">Movie ID:</strong> {movie.movieId}</p>
                    <p><strong className="text-red-500">Day:</strong> {movie.day}</p>
                    <p><strong className="text-red-500">Time:</strong> {movie.time}</p>
                    <p><strong className="text-red-500">Seat ID:</strong> {movie.seatId}</p>
                    <p><strong className="text-red-500">User ID:</strong> {movie.userId}</p>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-yellow-500 bg-yellow-900 p-4 rounded-lg shadow-lg">
              No movies reserved.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
