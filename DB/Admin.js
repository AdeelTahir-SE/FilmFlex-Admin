import connection from "./connectDB";

 export async function createAdmin(name, email, password, status) {
  const [rows] = await connection.execute("INSERT INTO Admin VALUES(?,?,?,?)", [
    name ?? null, 
    email ?? null, 
    password ?? null, 
    status ?? null
  ]);
  return rows;
}

export async function createAdminTable() {
  await connection.execute("CREATE TABLE IF NOT EXISTS Admin(name VARCHAR(255), email VARCHAR(255) PRIMARY KEY, password VARCHAR(255), status VARCHAR(255) default 'Manager')");
}
export async function getAdmins() {
  const [rows] = await connection.execute("SELECT * FROM Admin");
  return rows;
}
export async function getAdminByEmail(email,password) {
    const [rows]=await connection.execute("SELECT * FROM Admin WHERE email=? AND password=?",[email,password]);
    return rows;
}

