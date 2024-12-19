import connection from "./connectDB";
export async function getUsers() {
    const [rows] = await connection.execute("SELECT * FROM users");
    return rows;
}
