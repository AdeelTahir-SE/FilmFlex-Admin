import connection from "./connectDB";
export async function getTheaters() {
    const [rows] = await connection.execute("SELECT * FROM Theater");
    return rows;
}
export async function createTheater(name, location, phoneid) {
    const [rows] = await connection.execute("INSERT INTO Theater VALUES(?,?,?)", [
        name,
        location,
        phoneid
    ]);
    return rows;
}