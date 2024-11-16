import connection from "./connectDB";
export async function createCoupon(code, discount) {
    const [rows] = await connection.execute("INSERT INTO Discounts VALUES(?,?)", [
        code,
        discount
    ]);
    return rows;
}
export async function createDiscount(title, discount,image,from,to) {
    const [rows] = await connection.execute("INSERT INTO Discounts VALUES(?,?,?,?,?)", [
        code,
        discount,
        image,
        from,
        to
    ]);
    return rows;
}
export async function deleteDiscount(title,from,to) {
    const [rows] = await connection.execute("DELETE FROM Discounts WHERE title = ? AND from =? AND to = ?", [title,from,to]);
    return rows;
}

export async function getDiscounts() {
    const [rows] = await connection.execute("SELECT * FROM Discounts");
    return rows;
}