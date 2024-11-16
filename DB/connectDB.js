import mysql from 'mysql2/promise';
const connection=await  mysql.createConnection({
    host: 'localhost',
    user:process.env.User,
    password:process.env.Password,
    database:process.env.DB_DATABASE
});
export default connection;