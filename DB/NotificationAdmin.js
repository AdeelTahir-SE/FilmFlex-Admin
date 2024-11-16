import connection from "./connectDB";
export async function createNotification(title, description,imageURL) {
    const [rows] = await connection.execute("INSERT INTO Notification VALUES(?,?)", [
        title,
        description
    ]);
    return rows;
}
export async function getAllNotifications(email) {
    const [rows] = await connection.execute("SELECT * FROM NotificationAdmin WHERE email=?",[email]);
    return rows;
}

export async function deleteNotification(title,email) {
    const [rows] = await connection.execute("DELETE FROM NotificationAdmin WHERE title=? AND email=?", [title,email]);
    return rows;
}