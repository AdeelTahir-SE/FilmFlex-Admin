"use client";
import { useEffect, useState } from "react";
import { fetchMoviesWithSeatStatus, deleteMovie } from "./firebaseFunctions"; // Import the functions

export default function DeleteMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [reservedMovies, setReservedMovies] = useState(new Set()); // Holds reserved movie IDs

  // Fetch movies with seat status when the component mounts
  useEffect(() => {
    const getMovies = async () => {
      try {
        const movieList = await fetchMoviesWithSeatStatus(); // Get movies with seat status
        const reservedMovies = new Set();

        // Loop through each movie to check for reserved seats
        movieList.forEach(movie => {
          movie.days.forEach(day => {
            day.timings.forEach(timing => {
              if (timing.hasReservedSeats) {
                reservedMovies.add(movie.id); // Add movie id if any seat is reserved
              }
            });
          });
        });

        setMovies(movieList);
        setReservedMovies(reservedMovies); // Set reserved movies
      } catch (error) {
        setError("Error fetching movies with seat status");
      }
      setLoading(false);
    };

    getMovies();
  }, []);

  // Handle movie deletion
  const handleDeleteMovie = async (movieId) => {
    try {
      await deleteMovie(movieId); // Call delete function
      const updatedMovies = await fetchMoviesWithSeatStatus(); // Refresh movie list
      setMovies(updatedMovies);
    } catch (error) {
      setError("Error deleting the movie");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Delete Movies</h1>

      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <p>Loading movies...</p>
      ) : (
        <div>
          <h2 className="text-xl text-green-400 mb-4">Movies Without Reserved Seats</h2>
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Movie</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Trailer</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies
                .filter((movie) => !reservedMovies.has(movie.id)) // Filter out reserved movies
                .map((movie) => (
                  <tr key={movie.id}>
                    <td className="py-2 px-4 border-b">{movie.name || "No Name"}</td>
                    <td className="py-2 px-4 border-b">{movie.description || "No description"}</td>
                    <td className="py-2 px-4 border-b">
                      <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
                    </td>
                    <td className="py-2 px-4 border-b">{movie.rating || "N/A"}</td>
                    <td className="py-2 px-4 border-b">
                      <img src={movie.image} alt={movie.name} className="w-20 h-30 object-cover rounded-md" />
                    </td>
                    <td className="py-2 px-4 border-b">
                      <button
                        onClick={() => handleDeleteMovie(movie.id)}
                        className="bg-red-600 text-white px-4 py-2 rounded-md"
                      >
                        Delete Movie
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      )}

      <h2 className="text-xl text-yellow-400 mt-8 mb-4">Movies With Reserved Seats (Not Deletable)</h2>
      <table className="min-w-full bg-gray-800 text-white">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Movie</th>
            <th className="py-2 px-4 border-b">Description</th>
            <th className="py-2 px-4 border-b">Trailer</th>
            <th className="py-2 px-4 border-b">Rating</th>
            <th className="py-2 px-4 border-b">Image</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {movies
            .filter((movie) => reservedMovies.has(movie.id)) // Filter movies with reserved seats
            .map((movie) => (
              <tr key={movie.id}>
                <td className="py-2 px-4 border-b">{movie.name || "No Name"}</td>
                <td className="py-2 px-4 border-b">{movie.description || "No description"}</td>
                <td className="py-2 px-4 border-b">
                  <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">Watch Trailer</a>
                </td>
                <td className="py-2 px-4 border-b">{movie.rating || "N/A"}</td>
                <td className="py-2 px-4 border-b">
                  <img src={movie.image} alt={movie.name} className="w-20 h-30 object-cover rounded-md" />
                </td>
                <td className="py-2 px-4 border-b">Cannot be deleted</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
}
