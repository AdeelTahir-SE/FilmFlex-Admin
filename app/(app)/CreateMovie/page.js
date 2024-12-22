"use client";
import React, { useState, useEffect } from "react";
import { createMovieStructure } from "@/DB/connectFB";

export default function CreateMovie() {
  const [formData, setFormData] = useState({
    title: "asd",
    description: "dsa",
    genre: "asd,dsa,asd",
    seatCount: 120,
    image: null,
    trailerLink: "https://youtu.be/R2hSkF4UrKs?si=QZnts_2tJb3R-PvT",
    rating: "6",
    price: "80",
    duration: "90",
    daysAndTimings: [{ day: "Monday", timing: "10:00:00" }],
  });

  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [isFormValid, setIsFormValid] = useState(false);
  const [clicked, setclicked] = useState(false);
  useEffect(() => {
    // Validate the form: ensure rating is <= 5 and other fields are filled
    const isValid =
      formData.rating <= 5 &&
      formData.title &&
      formData.description &&
      formData.genre &&
      formData.seatCount &&
      formData.image &&
      formData.trailerLink &&
      formData.price &&
      formData.duration &&
      formData.daysAndTimings.every((entry) => entry.day && entry.timing);

    setIsFormValid(isValid);
  }, [formData]);

  const handleChange = (e) => {
    const { name, value, files, dataset } = e.target;

    if (name === "image") {
      setFormData({ ...formData, [name]: files ? files[0] : value });
    } else if (dataset.index !== undefined) {
      const newDaysAndTimings = [...formData.daysAndTimings];
      newDaysAndTimings[dataset.index] = {
        ...newDaysAndTimings[dataset.index],
        [name]: value,
      };
      setFormData({ ...formData, daysAndTimings: newDaysAndTimings });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleAddDayTime = () => {
    setFormData({
      ...formData,
      daysAndTimings: [...formData.daysAndTimings, { day: "", timing: "" }],
    });
  };

  const handleRemoveDayTime = (index) => {
    const newDaysAndTimings = [...formData.daysAndTimings];
    newDaysAndTimings.splice(index, 1);
    setFormData({ ...formData, daysAndTimings: newDaysAndTimings });
  };

  const handleSubmit = async (event) => {
    setclicked(true);
    event.preventDefault();
    setError(null);
    setSuccessMessage(null);

    const {
      title,
      description,
      genre,
      seatCount,
      image,
      trailerLink,
      rating,
      price,
      duration,
      daysAndTimings,
    } = formData;

    if (!image) {
      setError("Please upload an image.");
      return;
    }

    if (rating > 5) {
      setError("Rating cannot be greater than 5.");
      return;
    }

    if (daysAndTimings.some((entry) => !entry.day || !entry.timing)) {
      setError("Please specify both day and time for each movie showing.");
      return;
    }

    // Create FormData object
    const form = new FormData();
    form.append("title", title);
    form.append("description", description);
    form.append("genre", genre);
    form.append("image", image);
    form.append("trailerlink", trailerLink);
    form.append("rating", rating);
    form.append("price", price);
    form.append("duration", duration);
    form.append("seats", seatCount);

    // Append days and timings in a format suitable for your backend
    form.append("daysAndTimings", JSON.stringify(daysAndTimings));

    try {
      const response = await fetch("/api/Movies", {
        method: "POST",
        body: form,
      });

      if (response.ok) {
        const data = await response.json();
        const movieId = data.movie.movieId;

        // Handle movie structure creation based on the submitted days and timings
        for (const { day, timing } of daysAndTimings) {
          for (let seatNumber = 1; seatNumber <= seatCount; seatNumber++) {
            console.log("Creating movie structure for:", {
              movieId,
              day,
              timing,
              seatNumber,
            });
            await createMovieStructure(
              movieId.toString(),
              day.toString(),
              timing.toString(),
              seatNumber.toString(),
              "available",
              null
            );
          }
        }

        setSuccessMessage("Movie created successfully!");

        // Reset form after successful submission
        setFormData({
          title: "",
          description: "",
          genre: "",
          seatCount: 10,
          image: null,
          trailerLink: "",
          rating: "",
          price: "",
          duration: "",
          daysAndTimings: [{ day: "", timing: "" }],
        });
      } else {
        setError("Failed to create movie.");
      }
    } catch (error) {
      console.error("Error creating movie and seats database:", error);
      setError("An error occurred while creating the movie.");
    } finally {
      setclicked(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <h1 className="text-6xl font-bold text-center mb-4 text-transparent bg-clip-text bg-gradient-to-b from-red-500 via-red-700 to-black">
        Add a New Movie
      </h1>

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
        {Object.keys(formData).map((key) => {
          if (key === "daysAndTimings") return null;

          return (
            key !== "image" && (
              <div key={key} className="flex flex-col space-y-2">
                <label
                  className="text-lg font-semibold text-gray-300"
                  htmlFor={key}
                >
                  {key.replace(/([A-Z])/g, " $1").toUpperCase()}:
                </label>
                <input
                  type={
                    key === "seatCount" ||
                    key === "rating" ||
                    key === "price" ||
                    key === "duration"
                      ? "number"
                      : "text"
                  }
                  name={key}
                  id={key}
                  value={formData[key]}
                  onChange={handleChange}
                  required={key !== "image"}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                />
                <small className="text-gray-400">
                  {key === "timings"
                    ? "Enter timings as a comma-separated list (e.g., 18:00:00, 23:00:00)."
                    : key === "days"
                    ? "Enter days as a comma-separated list (e.g., Monday, Tuesday)."
                    : `Enter the movie's ${key
                        .replace(/([A-Z])/g, " $1")
                        .toLowerCase()}.`}
                </small>
              </div>
            )
          );
        })}

        <div className="space-y-4">
          {formData.daysAndTimings.map((entry, index) => (
            <div key={index} className="flex space-x-4">
              <div className="flex-1">
                <label
                  className="text-lg font-semibold text-gray-300"
                  htmlFor={`day-${index}`}
                >
                  Day:
                </label>
                <input
                  type="text"
                  name="day"
                  value={entry.day}
                  onChange={handleChange}
                  data-index={index}
                  id={`day-${index}`}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                />
              </div>
              <div className="flex-1">
                <label
                  className="text-lg font-semibold text-gray-300"
                  htmlFor={`timing-${index}`}
                >
                  Timing:
                </label>
                <input
                  type="text"
                  name="timing"
                  value={entry.timing}
                  onChange={handleChange}
                  data-index={index}
                  id={`timing-${index}`}
                  className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemoveDayTime(index)}
                className="text-red-500 p-4 bg-red-800 rounded-lg hover:bg-red-700 transition duration-200"
              >
                Remove
              </button>
            </div>
          ))}

          <button
            type="button"
            onClick={handleAddDayTime}
            className="w-full p-4 bg-blue-600 text-white font-bold rounded-lg hover:bg-blue-700 transition duration-300 transform hover:scale-105"
          >
            Add Day and Timing
          </button>
        </div>

        <div className="flex flex-col space-y-2">
          <label
            className="text-lg font-semibold text-gray-300"
            htmlFor="image"
          >
            UPLOAD IMAGE:
          </label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={handleChange}
            required
            className="w-full p-4 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-red-600 transition duration-200"
          />
          <small className="text-gray-400">
            Upload a cover image for the movie.
          </small>
        </div>

        {!clicked ? (
          <button
            type="submit"
            disabled={!isFormValid}
            className="w-full p-4 bg-red-600 text-white font-bold rounded-lg hover:bg-red-700 transition duration-300 transform hover:scale-105"
          >
            Submit
          </button>
        ) : (
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
          </div>
        )}
        {!isFormValid && (
          <small className="text-red-500 text-center">
            Please fill all required fields and ensure the rating is less than
            or equal to 5.
          </small>
        )}
      </form>
    </div>
  );
}
