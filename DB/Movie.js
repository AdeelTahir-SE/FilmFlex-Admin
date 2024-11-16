export async function getMovies() {
    const [rows] = await connection.execute("SELECT * FROM Movie");
    return rows;
}
export async function createMovie(title, description, rating, year, genre, duration, image,trailerlink,seats) {
    const [rows] = await connection.execute("INSERT INTO Movie VALUES(?,?,?,?,?,?,?,?,?,?)", [
        title,
        description,
        rating,
        year,
        genre,
        duration,
        image,
        trailerlink,
        seats
    ]);
    return rows;
}
export async function deleteMovie(title) {
    const [rows] = await connection.execute("DELETE FROM Movie WHERE title=?", [title]);
    return rows;
}