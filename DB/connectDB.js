import mysql from "mysql2/promise";

const connection = await mysql.createConnection({
  host: "localhost",
  user: process.env.DB_User,
  password: process.env.DB_Password,
  database: process.env.DB_DATABASE,
});

const createTables = async () => {
  try {
    await connection.execute(`CREATE DATABASE IF NOT EXISTS FilmFlex`);
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS User (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL,
                profilePicUrl VARCHAR(255)
            );
        `);

    // Admin table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Admin (
                adminId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                password VARCHAR(255) NOT NULL
            );
        `);

    // Movie table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Movie (
                movieId INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                trailer VARCHAR(255),
                movieRatings DECIMAL(3, 2)
            );
        `);

    // MovieGenres table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MovieGenres (
                movieGenreId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                genre VARCHAR(255) NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // MovieTimings table (with unique constraint to prevent duplicate timings for the same movie and day)
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MovieTimings (
                timingId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                duration INT NOT NULL,
                timings TIME NOT NULL,
                day ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
                UNIQUE (movieId, day, timings),  -- Prevent duplicate timings for the same movie and day
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // MoviePrices table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MoviePrices (
                priceId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                price DECIMAL(10, 2) NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // MovieImage table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS MovieImage (
                imageId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                imageUrl VARCHAR(255) NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // Reviews table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Reviews (
                reviewId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                userId INT NOT NULL,
                rating DECIMAL(2, 1) CHECK (rating >= 0 AND rating <= 5),
                \`desc\` TEXT NOT NULL,
                timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE,
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
            );
        `);

    // Reservation table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Reservation (
                reservationId INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                movieId INT NOT NULL,
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // UserNotifications table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS UserNotifications (
                notificationId INT AUTO_INCREMENT PRIMARY KEY,
                userId INT NOT NULL,
                message TEXT NOT NULL,
                title VARCHAR(255) NOT NULL,
                time DATETIME DEFAULT CURRENT_TIMESTAMP,
                image VARCHAR(255),
                FOREIGN KEY (userId) REFERENCES User(id) ON DELETE CASCADE
            );
        `);

    // Transactions table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Transactions (
                transactionId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                method ENUM('JazzCash', 'Easypaisa') NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    // Offers table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS Offers (
                id INT AUTO_INCREMENT PRIMARY KEY,
                title VARCHAR(255) NOT NULL,
                description TEXT NOT NULL,
                discount VARCHAR(50) NOT NULL,
                icon TEXT NOT NULL
            );
        `);

    // DiscountPrices table
    await connection.execute(`
            CREATE TABLE IF NOT EXISTS DiscountPrices (
                discountId INT AUTO_INCREMENT PRIMARY KEY,
                movieId INT NOT NULL,
                discountPercentage DECIMAL(5, 2) CHECK (discountPercentage >= 0 AND discountPercentage <= 100),
                discountDay ENUM('Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday') NOT NULL,
                discountTime TIME NOT NULL,
                FOREIGN KEY (movieId) REFERENCES Movie(movieId) ON DELETE CASCADE
            );
        `);

    await connection.execute(`
        CREATE OR REPLACE VIEW TrendingMovies AS
        SELECT 
            m.MovieId AS movieId,
            m.name AS movieName,
            m.description,
            m.trailer,
            m.movieRatings,
            COUNT(r.reservationId) AS reservationCount, 
            AVG(rev.rating) AS averageRating, 
            GROUP_CONCAT(DISTINCT mg.genre) AS genres, 
            ANY_VALUE(mi.imageUrl) AS movieImage
        FROM 
            Movie AS m
        JOIN 
            Reservation AS r ON m.MovieId = r.movieId
        LEFT JOIN 
            Reviews AS rev ON m.MovieId = rev.movieId
        LEFT JOIN 
            MovieGenres AS mg ON m.MovieId = mg.movieId
        LEFT JOIN 
            MovieImage AS mi ON m.MovieId = mi.movieId
        GROUP BY 
            m.MovieId
        ORDER BY 
            reservationCount DESC, averageRating DESC
        LIMIT 7;
    `);

    await connection.execute(`
        CREATE OR REPLACE VIEW UserReviews AS
        SELECT 
            u.id AS userId,
            u.name AS userName,
            u.profilePicUrl AS userAvatar, 
            r.rating AS userRating,
            r.desc AS userComment,
            r.timestamp AS reviewDate
        FROM 
            Reviews r
        JOIN 
            User u ON r.userId = u.id
        ORDER BY 
            r.timestamp DESC LIMIT 3;
    `);

    await connection.execute(`
        CREATE OR REPLACE VIEW MovieSales AS
        SELECT 
            m.MovieId AS movieId,
            m.name AS movieName,
            mp.price AS originalPrice,
            dp.discountPercentage,
            dp.discountDay,
            dp.discountTime,
            (mp.price - (mp.price * dp.discountPercentage / 100)) AS salePrice,
            mi.imageUrl AS movieImage
        FROM 
            MoviePrices AS mp
        JOIN 
            DiscountPrices AS dp ON mp.movieId = dp.movieId
        JOIN 
            Movie AS m ON mp.movieId = m.MovieId
        LEFT JOIN 
            MovieImage AS mi ON m.MovieId = mi.movieId;
    `);

    await connection.execute(`
        CREATE OR REPLACE VIEW MovieDetailsWithReviews AS
        SELECT 
            m.MovieId AS movieId,
            m.name AS movieName,
            m.description AS movieDescription,
            m.trailer AS movieTrailer,
            AVG(rev.rating) AS averageRating,
            COUNT(rev.reviewId) AS totalReviews,
            GROUP_CONCAT(DISTINCT rev.desc ORDER BY rev.timestamp DESC) AS latestReviews,
            GROUP_CONCAT(DISTINCT rev.userId ORDER BY rev.timestamp DESC) AS reviewAuthors,
            ANY_VALUE(mi.imageUrl) AS movieImage
        FROM 
            Movie AS m
        LEFT JOIN 
            Reviews AS rev ON m.MovieId = rev.movieId
        LEFT JOIN 
            MovieImage AS mi ON m.MovieId = mi.movieId
        GROUP BY 
            m.MovieId;
    `);

    await connection.execute(`
        CREATE OR REPLACE VIEW MovieOffers AS
        SELECT 
            o.id AS offerId,
            o.title AS offerTitle,
            o.description AS offerDescription,
            o.discount AS offerDiscount,
            o.icon AS offerIcon
        FROM 
            Offers AS o;
    `);

await connection.execute(`
 CREATE OR REPLACE VIEW MovieDetailsWithTimings AS
SELECT 
    m.movieId,
    m.name,
    m.description,
    mi.imageUrl,
    m.trailer, -- Assuming the trailer URL is stored in the Movie table
    s.day,
    s.timings,
    r.reviewId,
    r.desc AS reviewDescription,
    r.rating AS reviewRating
FROM 
    Movie m
INNER JOIN 
    MovieTimings s ON m.movieId = s.movieId
INNER JOIN 
    Movieimage mi ON mi.movieId = m.movieId
LEFT JOIN 
    Reviews r ON m.movieId = r.movieId;

    `)
    await connection.execute(`
        CREATE OR REPLACE VIEW week_movies_summary AS
SELECT
    m.movieId,
    m.name,
    m.description,
    mt.duration,
    mt.timings,
    mt.day,
    mp.price,
    mi.imageUrl
FROM
    Movie m
INNER JOIN 
    MovieTimings mt ON m.movieId = mt.movieId
    
    INNER JOIN
    MovieImage mi ON m.movieId = mi.movieId
    INNER JOIN MoviePrices as mp ON mp.movieId=m.movieId 
ORDER BY
    FIELD(mt.day, 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday');
        `)

    console.log("Tables created successfully!");
  } catch (err) {
    console.log("Error creating tables:", err);
  } 
};

createTables();

export default connection;