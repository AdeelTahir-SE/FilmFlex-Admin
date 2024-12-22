"use client";

import { useState, useEffect } from "react";
import PieGraph from "../Componenets/PieGraph";
import LineGraph from "../Componenets/LineChart";
import { Spotlight } from "../Componenets/Spotlight";

export default function Dashboard() {
  const [data, setData] = useState({
    totalReservations: 1200,
    peakReservationsTime: "7:00 PM - 9:00 PM",
    totalRevenue: "$24,000",
    revenueFromTickets: "$20,000",
    revenueFromConcessions: "$4,000",
    topMovies: [
      { title: "Avengers: Endgame", reservations: 300 },
      { title: "Inception", reservations: 250 },
      { title: "Interstellar", reservations: 200 },
    ],
    averageSeatUtilization: "85%",
    mostPopularDays: [
      { day: "Saturday", reservations: 400 },
      { day: "Friday", reservations: 350 },
    ],
    feedback: [
      { user: "User1", message: "Great experience!", rating: 5 },
      { user: "User2", message: "Loved the new seats.", rating: 4 },
    ],
  });

  async function fetchAdminData(id) {
    try {
      const response = await fetch(`/api/Dashboard/${id}`);
      const { adminData } = await response.json();
      setData(adminData);
    } catch (error) {
      console.error("Failed to fetch data:", error);
    }
  }

  useEffect(() => {
    fetchAdminData(1);
  }, []);

  return (
    <section className="dashboard bg-black text-white rounded w-full min-h-full p-6">
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />
      <h1 className="text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-b from-red-700 via-red-600 to-slate-700">
        Admin Dashboard
      </h1>

      {data && (
        <div className="flex flex-wrap gap-6">
          {/* Reservation Overview */}
          <section className="flex-1 min-w-[300px] border-2 border-gray-700 rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Reservation Summary</h2>
            <PieGraph chartTitle="Total Reservations" chartDescription="Reservations by movie" />
            <p><b>Total Reservations:</b> {data.totalReservations}</p>
            <p><b>Peak Reservation Time:</b> {data.peakReservationsTime}</p>
            <p><b>Avg Seat Utilization:</b> {data.averageSeatUtilization}</p>
          </section>

          {/* Top Performing Movies */}
          <section className="flex-1 min-w-[300px] border-2 border-gray-700 rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Top Performing Movies</h2>
            <ul>
              {data.topMovies.map((movie, index) => (
                <li key={index}>
                  <p><b>{movie.title}:</b> {movie.reservations} reservations</p>
                </li>
              ))}
            </ul>
          </section>

          {/* Popular Days */}
          <section className="flex-1 min-w-[300px] border-2 border-gray-700 rounded p-4">
            <h2 className="text-2xl font-bold mb-4">Popular Days</h2>
            <LineGraph chartTitle="Daily Reservations" chartDescription="Reservations by day" />
            <ul>
              {data.mostPopularDays.map((day, index) => (
                <li key={index}>
                  <p><b>{day.day}:</b> {day.reservations} reservations</p>
                </li>
              ))}
            </ul>
          </section>

          {/* User Feedback */}
          <section className="flex-1 min-w-[300px] border-2 border-gray-700 rounded p-4">
            <h2 className="text-2xl font-bold mb-4">User Feedback</h2>
            <ul>
              {data.feedback.map((review, index) => (
                <li key={index} className="mb-2">
                  <p><b>{review.user}:</b> {review.message}</p>
                  <p><b>Rating:</b> {review.rating} / 5</p>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </section>
  );
}
