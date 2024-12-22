"use client";
import { useEffect, useState } from "react";
import { deleteMovie } from "@/DB/connectFB"; // Import the delete function
import { fetchMoviesWithSeatStatus } from "@/DB/connectFB"; // Import the function to fetch Firebase movies

export default function DeleteMovies() {
  const [movies, setMovies] = useState({
    deletableMovies: [],
    nonDeletableMovies: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch movies from API and Firebase to compare IDs
  useEffect(() => {
    const getMovies = async () => {
      try {
        const response = await fetch("/api/Movies"); // Fetch from your API endpoint
        const movieListFromAPI = await (await response.json()).movies; // Assuming the response is JSON
        const firebaseMovies = await fetchMoviesWithSeatStatus();
        const reservedMovieIds = new Set();

        // Collect movie IDs with reserved seats
        firebaseMovies.forEach((movie) => {
          reservedMovieIds.add(movie.id);
        });

        const deletableMovies = [];
        const nonDeletableMovies = [];

        movieListFromAPI.forEach((movie) => {
          console.log(movie.movieId);

          if (reservedMovieIds.has((movie.movieId).toString())) {
            nonDeletableMovies.push(movie);
          } else {
            deletableMovies.push(movie); // Movie can be deleted
          }
        });

        // Update the state with the categorized movies
        setMovies({ deletableMovies, nonDeletableMovies });
      } catch (error) {
        setError("Error fetching movies from the API or Firebase");
      }
      setLoading(false);
    };

    getMovies();
  }, []);

  // Handle movie deletion
  const handleDeleteMovie = async (movieId) => {
    console.log(movieId);
    setLoading(true);
    try {
      await deleteMovie(movieId.toString()); // Call delete function
      const response = await fetch("/api/Movies", {
        method: "DELETE",
        body: JSON.stringify({movieId}),
        headers: { "Content-Type": "application/json" },
      });

      const updatedMovies = await response.json();
      // Re-fetch Firebase data to check reserved seats
      const firebaseMovies = await fetchMoviesWithSeatStatus();
      const reservedMovieIds = new Set();
      firebaseMovies.forEach((movie) => {
        movie.days.forEach((day) => {
          day.timings.forEach((timing) => {
            if (timing.hasReservedSeats) {
              reservedMovieIds.add(movie.id);
            }
          });
        });
      });

      const deletableMovies = [];
      const nonDeletableMovies = [];
      updatedMovies.forEach((movie) => {
        if (reservedMovieIds.has(movie.movieId.toString())) {
          nonDeletableMovies.push(movie);
        } else {
          deletableMovies.push(movie);
        }
      });

      setMovies({ deletableMovies, nonDeletableMovies });
      setLoading(false);
      console.log("Movie deleted successfully");
    } catch (error) {
      setError("Error deleting the movie");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <h1 className="text-3xl font-bold mb-4">Delete Movies</h1>

      {error && <div className="text-red-500">{error}</div>}

      {loading ? (
        <div className="text-center bg-black min-h-screen flex justify-center items-center">
          <div className="inline-block animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-red-500"></div>
        </div>
      ) : (
        <div>
          {/* Display deletable movies */}
          <h2 className="text-xl text-green-400 mb-4">
            Movies Without Reserved Seats (Deletable)
          </h2>
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">Id</th>
                <th className="py-2 px-4 border-b">Movie</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Trailer</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {movies.deletableMovies.map((movie) => (
                <tr key={movie.id}>
                  <td className="py-2 px-4 border-b">{movie.movieId}</td>
                  <td className="py-2 px-4 border-b">
                    {movie.name || "No Name"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {movie.description || "No description"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Trailer
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {movie.rating || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={movie.imageUrl}
                      alt={movie.name}
                      className="w-20 h-30 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() => handleDeleteMovie(movie.movieId)}
                      className="bg-red-600 text-white px-4 py-2 rounded-md"
                    >
                      Delete Movie
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Display non-deletable movies */}
          <h2 className="text-xl text-yellow-400 mt-8 mb-4">
            Movies With Reserved Seats (Not Deletable)
          </h2>
          <table className="min-w-full bg-gray-800 text-white">
            <thead>
              <tr>
                <th className="py-2 px-4 border-b">ID</th>
                <th className="py-2 px-4 border-b">Movie</th>
                <th className="py-2 px-4 border-b">Description</th>
                <th className="py-2 px-4 border-b">Trailer</th>
                <th className="py-2 px-4 border-b">Rating</th>
                <th className="py-2 px-4 border-b">Image</th>
                <th className="py-2 px-4 border-b">Status</th>
              </tr>
            </thead>
            <tbody>
              {movies.nonDeletableMovies.map((movie) => (
                <tr key={movie.id}>
                  <td className="py-2 px-4 border-b">{movie.movieId}</td>

                  <td className="py-2 px-4 border-b">
                    {movie.name || "No Name"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {movie.description || "No description"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <a
                      href={movie.trailer}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Watch Trailer
                    </a>
                  </td>
                  <td className="py-2 px-4 border-b">
                    {movie.rating || "N/A"}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <img
                      src={movie.imageUrl}
                      alt={movie.name}
                      className="w-20 h-30 object-cover rounded-md"
                    />
                  </td>
                  <td className="py-2 px-4 border-b">Cannot be deleted</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
