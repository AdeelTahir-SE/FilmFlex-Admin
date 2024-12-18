import { createMovie, getMovies } from "@/DB/Movie";

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
        // console.log("formdata on the api route",formData)

        const title = formData.get("title");
        const description = formData.get("description");
        const rating = formData.get("rating")
        const year = formData.get("year");
        const genre = formData.get("genre");
        const duration = formData.get("duration");
        const image = formData.get("image");
        const trailerlink = formData.get("trailerlink");
        const seats = formData.get("seats");

        // Validate required fields
        if (!title || !description || !rating || !year || !genre || !duration) {
            return new Response(
                JSON.stringify({ success: false, error: "Missing required fields" }),
                { status: 400, headers: { "content-type": "application/json" } }
            );
        }

        // Create a new movie in the database
        const movie = await createMovie(
            title,
            description,
            rating,
            year,
            genre,
            duration,
            image,
            trailerlink,
            seats
        );

        return new Response(JSON.stringify({ success: true, movie }), {
            status: 201,
            headers: { "content-type": "application/json" },
        });
    } catch (error) {
        // Handle any server-side errors
        console.log("ali ka error",error)
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
