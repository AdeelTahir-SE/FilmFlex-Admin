import connection from "./connectDB";
export async function getTransactions() {
    const [rows] = await connection.execute("SELECT * FROM TransactionsAdmin");
    return rows;
}
export async function createTransaction(date, amount, movieid,theid,time) {
    const [rows] = await connection.execute("INSERT INTO TransactionsAdmin VALUES(?,?,?)", 
    [date, amount, movieid,theid,time]);
    
    return rows;
}