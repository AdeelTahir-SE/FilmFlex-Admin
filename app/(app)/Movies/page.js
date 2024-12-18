"use client";
import { useState } from "react";

export default function MovieForm() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    year: "",
    genre: "",
    duration: "",
    image: "",
    trailerLink: "",
    seats: "",
    premiumSeats: [],
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePremiumSeatsChange = (e) => {
    const { value } = e.target;
    setFormData({ ...formData, premiumSeats: value.split(',').map(seat => seat.trim()) });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setSuccessMessage(null);

    try {
      // Convert premiumSeats array to a string before sending
      const premiumSeats = formData.premiumSeats.join(', ');
  
      const response = await fetch("/api/Movies", {
        method: "POST",
        body: new URLSearchParams({
          ...formData,
          premiumSeats, // Add premiumSeats as a string
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit form");
      }
  
      setSuccessMessage("Movie submitted successfully!");
      setFormData({
        title: "",
        description: "",
        rating: "",
        year: "",
        genre: "",
        duration: "",
        image: "",
        trailerLink: "",
        seats: "",
        premiumSeats: [],
      });
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
        Add a New Movie</h1>

      {error && (
        <p className="mb-4 text-red-500 text-center p-2 bg-red-900 border border-red-700 rounded">
          {error}
        </p>
      )}
      {successMessage && (
        <p className="mb-4 text-green-500 text-center p-2 bg-green-900 border border-green-700 rounded">
          {successMessage}
        </p>
      )}

      <form
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-gray-900 p-8 rounded-lg shadow-lg space-y-6"
      >
        {Object.keys(formData).map((key) => (
          key !== "premiumSeats" && (
            <div key={key} className="flex flex-col space-y-2">
              <label
                className="text-lg font-semibold text-gray-300"
                htmlFor={key}
              >
                {key.replace(/([A-Z])/g, ' $1').toUpperCase()}:
              </label>
              <input
                type={key === "rating" || key === "year" || key === "duration" || key === "seats" ? "number" : "text"}
                name={key}
                id={key}
                value={formData[key]}
                onChange={handleChange}
                required
                className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                aria-label={key}
              />
              <small className="text-gray-400">{`Enter the movie's ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}.`}</small>
            </div>
          )
        ))}

        <div className="flex flex-col space-y-2">
          <label className="text-lg font-semibold text-gray-300" htmlFor="premiumSeats">
            Premium Seats (comma-separated):
          </label>
          <input
            type="text"
            name="premiumSeats"
            id="premiumSeats"
            value={formData.premiumSeats.join(', ')}
            onChange={handlePremiumSeatsChange}
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
            aria-label="Premium Seats"
          />
          <small className="text-gray-400">Enter premium seats separated by commas.</small>
        </div>

        <button
          type="submit"
          className="w-full p-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
