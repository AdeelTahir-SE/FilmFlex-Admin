
import connection from "./connectDB";
import { hashPassword,verifyPassword } from "@/security/securityFunctions";


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
  "UPDATE Admin SET password=? WHERE password=?",[await hashPassword(new_Password),await hashPassword(current_Password)]);
  if(result.affectedRows===0)
  {
    console.log("Your password is incorrect");
    return false;
  }
  return true;
}

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

export async function getAdminById(id){
  try{
    const [rows] = await connection.execute("SELECT * FROM Admin WHERE id = ?", [id]);
    if(rows.length>0){
      return {success:true,data:rows[0]};
    }
    return {success:false,message:'Admin not found'};
    }catch(error){
      console.error("Error fetching admin by id:", error);
      return { success: false, message: 'Error fetching admin by id', error: error.message };
    }
}

export async functoin Signin(email,password){
  try{
    const admin=await getAdminByEmail(email);
    if(admin.success){
      const isValid=await verifyPassword(password,admin.data.password);
      if(isValid){
        return {success:true,data:admin.data};
      }
    }
    return {success:false,message:'Invalid credentials'};
  }