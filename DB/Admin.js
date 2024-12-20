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

export async function changeEmailOfAdmin(name, email) {
  try {
    const [result] = await connection.execute(
      "UPDATE Admin SET email = ? WHERE name = ?", 
      [email, name]
    );

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      console.log("No admin found with the given name.");
      return false;  // No rows were updated
    }

    return true;
  } catch (error) {
    console.error("Error updating admin email:", error);
    return false;
  }
}
export async function changeAdminPassword(current_Password,new_Password){
  const [result]= await connection.execute(
  "UPDATE Admin SET password=? WHERE password=?",[new_Password,current_Password]);
  if(result.affectedRows===0)
  {
    console.log("Your password is incorrect");
    return false;
  }
  return true;
}