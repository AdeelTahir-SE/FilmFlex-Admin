import bcrypt from 'bcryptjs';
import connection from "./connectDB";

// Hash the password before storing it
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Create Admin table with an 'id' column (auto-incrementing primary key)
export async function createAdminTable() {
  try {
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS admin (
        id INT AUTO_INCREMENT PRIMARY KEY,  -- Add an auto-incrementing id column
        name VARCHAR(255), 
        email VARCHAR(255) UNIQUE,           -- Ensure email is unique
        password VARCHAR(255), 
        status VARCHAR(255) DEFAULT 'Manager',
        notifications_enabled BOOLEAN DEFAULT TRUE
      )
    `);
  } catch (error) {
    console.error("Error creating table:", error);
    throw new Error("Error creating admin table");
  }
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

// Create Admin with hashed password
export async function createAdmin(name, email, password, status = 'Manager') {
  try {
    const hashedPassword = await hashPassword(password);  // Hash the password
    const [rows] = await connection.execute(
      "INSERT INTO admin (name, email, password, status) VALUES (?, ?, ?, ?)",
      [name, email, hashedPassword, status]
    );
    return { success: true, message: 'Admin created successfully', data: rows };
  } catch (error) {
    console.error("Error creating admin:", error);
    return { success: false, message: 'Error creating admin', error: error.message };
  }
}

// Get admin by email (used to check if the email already exists)
export async function getAdminByEmail(email) {
  try {
    const [rows] = await connection.execute("SELECT * FROM admin WHERE email = ?", [email]);
    if (rows.length > 0) {
      return { success: true, data: rows[0] };  // Return the admin object with id
    }
    return { success: false, message: 'Admin not found' };
  } catch (error) {
    console.error("Error fetching admin by email:", error);
    return { success: false, message: 'Error fetching admin by email', error: error.message };
  }
}

