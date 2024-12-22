import connection from "./connectDB";
import { hashPassword, verifyPassword } from "@/security/securityFunctions";

// Change email of admin
export async function changeEmailOfAdmin(name, email, adminId) {
  try {
    const [result] = await connection.execute(
      "UPDATE Admin SET email = ?, name = ? WHERE adminId = ?",
      [email, name, adminId]
    );

    // Check if any rows were affected
    if (result.affectedRows === 0) {
      console.log("No admin found with the given adminId.");
      return false;  // No rows were updated
    }

    return true;
  } catch (error) {
    console.error("Error updating admin email:", error);
    return false;
  }
}


// Change admin password
import bcrypt from 'bcryptjs'; // Assuming you're using bcrypt for password hashing

export async function changeAdminPassword(current_Password, new_Password, adminId) {
  try {
    // Fetch the current hashed password from the database for the admin
    const [admin] = await connection.execute(
      "SELECT password FROM Admin WHERE adminId = ?",
      [adminId]
    );

    if (admin.length === 0) {
      console.log("Admin not found.");
      return false;
    }

    const currentHashedPassword = admin[0].password;

    // Compare the provided current password with the stored hashed password
    const isMatch = await bcrypt.compare(current_Password, currentHashedPassword);

    if (!isMatch) {
      console.log("Your current password is incorrect.");
      return false;
    }

    // Hash the new password
    const hashedNewPassword = await bcrypt.hash(new_Password, 10);

    // Update the password in the database
    const [result] = await connection.execute(
      "UPDATE Admin SET password = ? WHERE adminId = ?",
      [hashedNewPassword, adminId]
    );

    if (result.affectedRows === 0) {
      console.log("Failed to update password.");
      return false;
    }

    return true;
  } catch (error) {
    console.error("Error changing password:", error);
    return false;
  }
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
