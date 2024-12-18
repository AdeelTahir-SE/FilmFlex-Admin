import connection from "@/DB/connectDB";

import 'dotenv/config'; // Loads variables from .env file

export async function getMovies() {
  const [rows] = await connection.execute("SELECT * FROM Movies");
  return rows;
}
export async function createMovie(
  title,
  description,
  rating,
  year,
  genre,
  duration,
  image,
  trailerlink,
  seats,
  premiumseats
) {
  // Check and handle undefined fields by replacing them with null or default values
  title = title ?? null;
  description = description ?? null;
  rating = rating ?? 0;
  year = year ?? 0;
  genre = genre ?? null;
  duration = duration ?? 0;
  image = image ?? null;
  trailerlink = trailerlink ?? null;
  seats = seats ?? 0;
  premiumseats = premiumseats ?? null;

  // Log the values to debug
  console.log("Inserting movie data:", {
    title,
    description,
    rating,
    year,
    genre,
    duration,
    image,
    trailerlink,
    seats,
    premiumseats,
  });

  const [rows] = await connection.execute(
    "INSERT INTO Movies (title, description, rating, year, genre, duration, image_url, trailerlink, seats, premiumseats) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      rating,
      year,
      genre,
      duration,
      image,
      trailerlink,
      seats,
      premiumseats,
    ]
  );
  return rows;
}


export async function deleteMovie(id) {
  const [rows] = await connection.execute("DELETE FROM Movies WHERE id=?", [
    id,
  ]);
  return rows;
}

export async function getWeeklyMovies(date, theater) {
  const [rows] = await connection.execute(
    "SELECT * FROM WeeklyMovies WHERE date=? AND theater=?",
    [date, theater]
  );
  return rows;
}

export async function createWeeklyMovie(date, theater, movie) {
  const [rows] = await connection.execute(
    "INSERT INTO WeeklyMovies VALUES(?,?,?)",
    [date, theater, movie]
  );
  return rows;
}
export async function deleteWeeklyMovie(date, theater, movie) {
  const [rows] = await connection.execute(
    "DELETE FROM WeeklyMovies WHERE date=? AND theater=? AND movie=?",
    [date, theater, movie]
  );
  return rows;
}
export async function getDayMovies(time, date, theater) {
  const [rows] = await connection.execute(
    "SELECT * FROM DayMovies WHERE time=? AND date=? AND theater=?",
    [time, date, theater]
  );
  return rows;
}
export async function createDayMovie(time, date, theater, movie) {
  const [rows] = await connection.execute(
    "INSERT INTO DayMovies VALUES(?,?,?,?)",
    [time, date, theater, movie]
  );
  return rows;
}
export async function deleteDayMovie(time, date, theater, movie) {
  const [rows] = await connection.execute(
    "DELETE FROM DayMovies WHERE time=? AND date=? AND theater=? AND movie=?",
    [time, date, theater, movie]
  );
  return rows;
}
