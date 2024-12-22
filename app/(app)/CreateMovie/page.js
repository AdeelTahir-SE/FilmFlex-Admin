"use client"
import React, { useState } from "react";
import { createMovieStructure } from "@/DB/connectFB";

export default function CreateMovie() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [releaseDate, setReleaseDate] = useState("");
  const [genre, setGenre] = useState("");
  const [timings, setTimings] = useState(""); // Comma-separated timings
  const [days, setDays] = useState(""); // Comma-separated days
  const [seatCount, setSeatCount] = useState(10); // Default seat count
  const [image, setImage] = useState(null); // Image file
  const [trailerLink, setTrailerLink] = useState(""); // Trailer link
  const [rating, setRating] = useState(""); // Movie rating
  const [price, setPrice] = useState(""); // Ticket price
  const [duration, setDuration] = useState(""); // Duration in minutes

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!image) {
      alert("Please upload an image.");
      return;
    }

    // Create FormData object for multipart form submission
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("releaseDate", releaseDate);
    formData.append("genre", genre);
    formData.append("image", image); // Add image file
    formData.append("trailerLink", trailerLink);
    formData.append("rating", rating);
    formData.append("price", price);
    formData.append("duration", duration);

    try {
      const response = await fetch("/api/movies", {
        method: "POST",
        body: formData, // Send FormData directly
      });

      if (response.ok) {
        const data = await response.json(); // Assuming the response contains the movieId
        const movieId = data.movieId;

        const timingsArray = timings.split(",").map((time) => time.trim());
        const daysArray = days.split(",").map((day) => day.trim());

        // Loop through days and timings
        for (const day of daysArray) {
          for (const timing of timingsArray) {
            for (let seatNumber = 1; seatNumber <= seatCount; seatNumber++) {
              // Create movie structure for each seat
              await createMovieStructure(movieId, day, timing, seatNumber, "available", null);
            }
          }
        }

        alert("Movie and seats database created successfully!");

        // Reset form fields
        setTitle("");
        setDescription("");
        setReleaseDate("");
        setGenre("");
        setTimings("");
        setDays("");
        setSeatCount(10);
        setImage(null);
        setTrailerLink("");
        setRating("");
        setPrice("");
        setDuration("");
      } else {
        alert("Failed to create movie.");
      }
    } catch (error) {
      console.error("Error creating movie and seats database:", error);
      alert("An error occurred while creating the movie.");
    }
  };

  return (
    <section className="flex flex-col p-4 bg-black text-white min-h-screen">
      <h1 className="text-2xl font-bold mb-4 text-red-600">Create Movie</h1>
      <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
        <label className="flex flex-col">
          Movie Title:
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Description:
          <textarea
            name="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Release Date:
          <input
            type="date"
            name="releaseDate"
            value={releaseDate}
            onChange={(e) => setReleaseDate(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Genre:
          <input
            type="text"
            name="genre"
            value={genre}
            onChange={(e) => setGenre(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Upload Image:
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Trailer Link:
          <input
            type="url"
            name="trailerLink"
            value={trailerLink}
            onChange={(e) => setTrailerLink(e.target.value)}
            required
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Movie Rating (out of 10):
          <input
            type="number"
            name="rating"
            value={rating}
            onChange={(e) => setRating(parseFloat(e.target.value))}
            required
            min="0"
            max="10"
            step="0.1"
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Ticket Price:
          <input
            type="number"
            name="price"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
            min="0"
            step="0.01"
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Duration (in minutes):
          <input
            type="number"
            name="duration"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value, 10))}
            required
            min="1"
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Timings (comma-separated):
          <input
            type="text"
            name="timings"
            value={timings}
            onChange={(e) => setTimings(e.target.value)}
            required
            placeholder="e.g., 10:00 AM, 1:00 PM, 4:00 PM"
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Days (comma-separated):
          <input
            type="text"
            name="days"
            value={days}
            onChange={(e) => setDays(e.target.value)}
            required
            placeholder="e.g., 2024-12-21, 2024-12-22"
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <label className="flex flex-col">
          Number of Seats:
          <input
            type="number"
            name="seatCount"
            value={seatCount}
            onChange={(e) => setSeatCount(parseInt(e.target.value, 10))}
            required
            min="1"
            className="border border-red-600 p-2 bg-black text-white"
          />
        </label>
        <button type="submit" className="bg-red-600 text-white p-2 rounded hover:bg-red-700">
          Create Movie
        </button>
      </form>
    </section>
  );
}
