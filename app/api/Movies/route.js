import cloudinary from "cloudinary";
import { deleteMovie,getMovies } from "@/DB/Movie";
import { createMovie, createMovieGenre, createMovieImage, createMovieTiming, createMoviePrice } from "@/DB/Movie"; // Assuming these functions exist

// Set up Cloudinary configuration
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET,
});

export const config = {
  api: {
    bodyParser: false, // Disable body parser for raw file upload
  },
};
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
      const formData = await request.formData();
  
      const title = formData.get("title");
      const description = formData.get("description");
      const rating = formData.get("rating");
      const genre = formData.get("genre"); // Comma-separated genres
      const duration = formData.get("duration");
      const image = formData.get("image"); // Image file
      const trailerlink = formData.get("trailerlink");
      const seats = formData.get("seats"); // Reserved for future usage
      const price = formData.get("price"); // Price for tickets
  
      // Expecting a JSON string of an array of objects for days and timings
      const daysAndTimingsStr = formData.get("daysAndTimings");
      let daysAndTimings = [];
      if (daysAndTimingsStr) {
        try {
          daysAndTimings = JSON.parse(daysAndTimingsStr);
        } catch (error) {
          return new Response(
            JSON.stringify({
              success: false,
              error: "Invalid JSON format for daysAndTimings",
              details: error.message,
            }),
            { status: 400, headers: { "content-type": "application/json" } }
          );
        }
      }
  
      console.log("Form data:", {
        title,
        description,
        rating,
        genre,
        duration,
        image,
        trailerlink,
        seats,
        daysAndTimings,
        price,
      });
  
      // Basic validation for required fields
      if (!title || !description || !rating || !duration || !daysAndTimings.length || !price || !genre) {
        return new Response(
          JSON.stringify({ success: false, error: "Missing required fields" }),
          { status: 400, headers: { "content-type": "application/json" } }
        );
      }
  
      // Ensure the daysAndTimings array contains valid day/timing objects
      for (const { day, timing } of daysAndTimings) {
        if (!day || !timing) {
          return new Response(
            JSON.stringify({ success: false, error: "Invalid day or timing provided" }),
            { status: 400, headers: { "content-type": "application/json" } }
          );
        }
      }
  
      // Create a new movie in the `movie` table
      const movie = await createMovie(title, description, rating, trailerlink);
      const movieId = movie.movieId; // Assuming `createMovie` returns the created `movieId`
  
      // Add genres (splitting by commas)
      const genresArray = genre.split(",").map((g) => g.trim());
      for (const genreItem of genresArray) {
        await createMovieGenre(movieId, genreItem);
      }
  
      // Handle image upload if exists
      let imageUrl = null;
      if (image) {
        // Read the image file from form data and upload to Cloudinary
        const arrayBuffer = await image.arrayBuffer();
        const buffer = Buffer.from(arrayBuffer);
  
        try {
          const uploadResult = await new Promise((resolve, reject) => {
            cloudinary.v2.uploader.upload_stream(
              {
                resource_type: "auto", // Automatically detect the file type
                public_id: `movies/${movieId}`, // Use movieId as the custom name for the file
              },
              (error, result) => {
                if (error) {
                  reject(error);
                } else {
                  resolve(result);
                }
              }
            ).end(buffer);
          });
  
          // Save the uploaded image URL in the database
          imageUrl = uploadResult.secure_url;
          await createMovieImage(movieId, imageUrl);
        } catch (uploadError) {
          console.error("Image upload failed:", uploadError);
          // Optionally, continue without the image or return an error
          return new Response(
            JSON.stringify({ success: false, error: "Image upload failed" }),
            { status: 500, headers: { "content-type": "application/json" } }
          );
        }
      }
  
      // Add timings for each day in the daysAndTimings array
      for (const { day, timing } of daysAndTimings) {
        await createMovieTiming(movieId, duration, timing, day);
      }
  
      // Add movie price
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
  

  export async function DELETE(request){

    const {movieId} = request.json();
    if (!movieId) {
      return new Response(
        JSON.stringify({ success: false, error: "Missing movie ID" }),
        { status: 400, headers: { "content-type": "application/json" } }
      );
    }
    const response= await deleteMovie(movieId);
    if(response){
      return new Response(JSON.stringify({ success: true, message: "Movie deleted successfully" }), {
        status: 200,
        headers: { "content-type": "application/json" },
      });
      }
      else{
        return new Response(
          JSON.stringify({ success: false, error: "Failed to delete movie" }),
          { status: 500, headers: { "content-type": "application/json" } }
        );
      }
      
  }