import connection from "./connectDB";
export async function getUsers() {
    const [rows] = await connection.execute("SELECT * FROM User");
    return rows;
}