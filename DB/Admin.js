import connection from "./connectDB";
import { hashPassword, verifyPassword } from "@/security/securityFunctions";

// Change email of admin
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

// Change admin password
export async function changeAdminPassword(current_Password, new_Password) {
  const [result] = await connection.execute(
    "UPDATE Admin SET password = ? WHERE password = ?",
    [await hashPassword(new_Password), await hashPassword(current_Password)]
  );
  
  if (result.affectedRows === 0) {
    console.log("Your password is incorrect");
    return false;
  }
  return true;
}

// Create admin
export async function createAdmin(name, email, password) {
  try {
    const hashedPassword = await hashPassword(password);  // Hash the password
    const [rows] = await connection.execute(
      "INSERT INTO Admin (name, email, password) VALUES (?, ?, ?)",
      [name, email, hashedPassword]
    );
    return { success: true, message: 'Admin created successfully', data: rows.insertId };
  } catch (error) {
    console.error("Error creating admin:", error);
    return { success: false, message: 'Error creating admin', error: error.message };
  }
}

// Get admin by email
export async function getAdminByEmail(email) {
  try {
    const [rows] = await connection.execute("SELECT * FROM Admin WHERE email = ?", [email]);
    if (rows.length > 0) {
      return { success: true, data: rows[0] };  // Return the admin object with adminId
    }
    return { success: false, message: 'Admin not found' };
  } catch (error) {
    console.error("Error fetching admin by email:", error);
    return { success: false, message: 'Error fetching admin by email', error: error.message };
  }
}

// Get admin by id
export async function getAdminById(adminId) {
  try {
    const [rows] = await connection.execute("SELECT * FROM Admin WHERE adminId = ?", [adminId]);
    if (rows.length > 0) {
      return { success: true, data: rows[0] };
    }
    return { success: false, message: 'Admin not found' };
  } catch (error) {
    console.error("Error fetching admin by id:", error);
    return { success: false, message: 'Error fetching admin by id', error: error.message };
  }
}

// Admin sign-in function
export async function Signin(email, password) {
  try {
    const admin = await getAdminByEmail(email);
    if (admin.success) {
      const isValid = await verifyPassword( password.toString(),admin.data.password);
      console.log(isValid)
      if (isValid) {
        console.log(admin)
        return { success: true, data: admin.data.adminId };
      }
    }
    return { success: false, message: 'Invalid credentials' };
  } 
  catch (error) {
    console.error("Error signing in:", error);
    return { success: false, message: 'Error signing in', error: error.message };
  }
}
