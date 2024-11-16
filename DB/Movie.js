export async function getMovies() {
  const [rows] = await connection.execute("SELECT * FROM Movie");
  return rows;
}
export async function createMovie(
  title,
  description,
  rating,
  dates,
  times,
  cost,
  premiumseats,
  reservedseats,
  boughtseats,
  duration,
  image,
  trailerlink,
  seats,
  theaterid
) {
  const [rows] = await connection.execute(
    "INSERT INTO Movie (title, description, rating,dates, times, cost, premiumseats, reservedseats, boughtseats, duration,image, trailerlink, seats, theaterid) VALUES (?, ?, ?, ?, ?, ?, ?, ?,  ?, ?, ?, ?, ?, ?)",
    [
      title,
      description,
      rating,
      dates,
      times,
      cost,
      premiumseats,
      reservedseats,
      boughtseats,
      duration,
      image,
      trailerlink,
      seats,
      theaterid,
    ]
  );
}
export async function deleteMovie(id) {
  const [rows] = await connection.execute("DELETE FROM Movie WHERE id=?", [
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
