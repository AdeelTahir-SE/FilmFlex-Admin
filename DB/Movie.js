import connection from "@/DB/connectDB";

export async function createMovie(name, description, movieRatings, trailer) {
  const query = `
      INSERT INTO movie (name, description, movieRatings, trailer) 
      VALUES (?, ?, ?, ?)
  `;
  const values = [name, description, movieRatings, trailer];

  const [result] = await connection.execute(query, values);
  return { movieId: result.insertId }; // Return the inserted movieId
}

export async function createMovieImage(movieId, imageUrl) {
  const query = `
      INSERT INTO movieimage (movieId, imageUrl) 
      VALUES (?, ?)
  `;
  const values = [movieId, imageUrl];

  await connection.execute(query, values);
}

export async function createMovieGenre(movieId, genre) {
  const query = `
      INSERT INTO moviegenres (movieId, genre) 
      VALUES (?, ?)
  `;
  const values = [movieId, genre];

  await connection.execute(query, values);
}

export async function createMovieTiming(movieId, duration, timings, day) {
  const query = `
      INSERT INTO movietimings (movieId, duration, timings, day) 
      VALUES (?, ?, ?, ?)
  `;
  const values = [movieId, duration, timings, day];

  await connection.execute(query, values);
}


export async function createMoviePrice(movieId, price) {
  const query = `
      INSERT INTO movieprices (movieId, price) 
      VALUES (?, ?)
  `;
  const values = [movieId, price];

  await connection.execute(query, values);
}

export async function getMovies() {
  const query = `
SELECT * FROM Movie INNER JOIN MovieImage ON Movie.movieId=MovieImage.movieId;
  `;

  const [rows] = await connection.execute(query);
  return rows;
}
export async function deleteMovie(movieId){
  const query = `
      DELETE FROM Movie WHERE movieId = ?
  `;
  const values = [movieId];

  const [result] = await connection.execute(query, values);
  return result.affectedRows > 0;
}