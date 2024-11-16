import mysql from 'mysql2/promise';
const connection=await  mysql.createConnection({
    host: 'localhost',
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DB_DATABASE
});

await connection.execute("CREATE TABLE IF NOT EXISTS admin(  name VARCHAR(255), email VARCHAR(255) PRIMARY KEY, password VARCHAR(255), status VARCHAR(255) default 'Manager')");
await connection.execute("CREATE TABLE IF NOT EXISTS Movies(id INT AUTO_INCREMENT PRIMARY KEY, title VARCHAR(255), description TEXT, genre VARCHAR(255), rating INT, release_date DATE, image_url VARCHAR(255))");
await connection.execute("CREATE TABLE IF NOT EXISTS Users(id INT AUTO_INCREMENT PRIMARY KEY, name VARCHAR(255), email VARCHAR(255), password VARCHAR(255))");
await connection.execute("CREATE TABLE IF NOT EXISTS Reviews(id INT AUTO_INCREMENT PRIMARY KEY, movie_id INT, user_id INT, rating INT, review TEXT)");
export default connection;