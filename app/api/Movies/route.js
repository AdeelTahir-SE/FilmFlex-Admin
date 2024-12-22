import { createMovie, getMovies } from "@/DB/Movie";
import { createMovie, createMovieImage, createMovieGenre, createMovieTiming, createMoviePrice } from '@/DB/movieOperations';

export async function GET() {
    try {
        // Fetch movies from the database
        const movies = await getMovies();

        // Return the list of movies as JSON
        return new Response(JSON.stringify({ success: true, movies }), {
            status: 200,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        // Error handling for database retrieval
        return new Response(
            JSON.stringify({
                success: false,
                error: "Failed to fetch movies",
                details: error.message,
            }),
            {
                status: 500,
                headers: { "content-type": "application/json" },
            }
        );
    }
}

export async function POST(request) {
    try {
        // Parse form data for POST request
        const formData = await request.formData();

        const title = formData.get("title");
        const description = formData.get("description");
        const rating = formData.get("rating");
        const year = formData.get("year"); // Not used in table schema but available
        const genre = formData.get("genre"); // Comma-separated genres
        const duration = formData.get("duration");
        const image = formData.get("image"); // URL for the image
        const trailerlink = formData.get("trailerlink");
        const seats = formData.get("seats"); // Reserved for future usage
        const timings = formData.get("timings"); // Comma-separated timings
        const days = formData.get("days"); // Comma-separated days
        const price = formData.get("price"); // Price for tickets

        // Validate required fields
        if (!title || !description || !rating || !duration || !timings || !days || !price || !genre) {
            return new Response(
                JSON.stringify({ success: false, error: "Missing required fields" }),
                { status: 400, headers: { "content-type": "application/json" } }
            );
        }

        // Create a new movie in the `movie` table
        const movie = await createMovie(title, description, rating, trailerlink);

        // Insert related data into other tables
        const movieId = movie.movieId; // Assuming `createMovie` returns the created `movieId`

        // Add genres (splitting by commas)
        const genresArray = genre.split(",").map((g) => g.trim());
        for (const genreItem of genresArray) {
            await createMovieGenre(movieId, genreItem);
        }

        // Add image
        if (image) {
            await createMovieImage(movieId, image);
        }

        // Add timings for each day
        const daysArray = days.split(",").map((day) => day.trim());
        const timingsArray = timings.split(",").map((time) => time.trim());
        for (const day of daysArray) {
            for (const timing of timingsArray) {
                await createMovieTiming(movieId, duration, timing, day);
            }
        }

        await createMoviePrice(movieId, price);

        return new Response(JSON.stringify({ success: true, movie }), {
            status: 201,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        console.error("Error creating movie:", error);
        return new Response(
            JSON.stringify({
                success: false,
                error: "Failed to create movie",
                details: error.message,
            }),
            { status: 500, headers: { "content-type": "application/json" } }
        );
    }
}
