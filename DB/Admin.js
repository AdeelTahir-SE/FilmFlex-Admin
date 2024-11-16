import connection from "./connectDB";
export async function createAdmin(name, email, password, status) {
  const [rows] = await connection.execute("INSERT INTO Admin VALUES(?,?,?,?)", [
    name,
    email,
    password,
    status,
  ]);
  return rows;
}
 export async function createAdmin(name, email, password, status) {
  const [rows] = await connection.execute("INSERT INTO Admin VALUES(?,?,?,?)", [
    name,
    email,
    password,
    status,
  ]);
  return rows;
}
export async function getAdmins() {
  const [rows] = await connection.execute("SELECT * FROM Admin");
  return rows;
}
export async function getAdminByEmail(email,password) {
    const [rows]=await connection.execute("SELECT * FROM Admin WHERE email=? AND password=?",[email,password]);
    return rows;
}

