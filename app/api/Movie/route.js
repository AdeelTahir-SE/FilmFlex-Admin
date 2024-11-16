import { createMovie } from "@/DB/Movie";
export async function GET(request) {
const fromdata=await request.formData();
const title=fromdata.get("title");
const description=fromdata.get("description");
const rating=fromdata.get("rating");
const year=fromdata.get("year");
const genre=fromdata.get("genre");
const duration=fromdata.get("duration");
const image=fromdata.get("image");
const trailerlink=fromdata.get("trailerlink");
const seats=fromdata.get("seats");
const movie = await createMovie(title, description, rating, year, genre, duration, image);
return new Response(JSON.stringify(movie), {
    headers: {
        "content-type": "application/json",
    },
});
}