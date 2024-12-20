import 'dotenv/config'; 
import mysql from 'mysql2/promise';


async function initDB() {
 
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
    });
    console.log("MySQL Database connected");

    // Create tables
    await connection.execute(
      "CREATE TABLE IF NOT EXISTS admin( name VARCHAR(255), email VARCHAR(255) PRIMARY KEY, password VARCHAR(255), status VARCHAR(255) DEFAULT 'Manager')"
    );
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS Movies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        genre VARCHAR(255),
        rating INT,
        year INT,
        release_date DATE,
        duration INT,
        image_url VARCHAR(255),
        trailerlink VARCHAR(255),
        seats INT,
        premiumseats TEXT
      )
    `);
    await connection.execute(
      "CREATE TABLE IF NOT EXISTS users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))"
    );
    await connection.execute(
      "CREATE TABLE IF NOT EXISTS Reviews(id INT AUTO_INCREMENT PRIMARY KEY, movie_id INT, user_id INT, rating INT, review TEXT)"
    );

    return connection;
  } catch (error) {
    console.error("Error connecting to MySQL or creating tables:", error);
    throw error;  // Propagate error for handling elsewhere
  }
}

const connection = await initDB();
export default connection;
