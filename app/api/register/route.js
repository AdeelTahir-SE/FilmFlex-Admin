import { NextResponse } from "next/server";
import { createAdmin, getAdminByEmail } from "@/DB/Admin"; // Add getAdminByEmail for checking if admin exists
import { createAdminTable } from "@/DB/Admin";

export async function POST(request) {
  console.log("Request received");

  // Parsing form data from the request
  const formData = await request.formData();
  const { name, email, password } = Object.fromEntries(formData);

  console.log("Received data:", email, password, name);

  // Validation of required fields
  if (!email || !password || !name) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    // Check if admin with the same email already exists
    const existingAdmin = await getAdminByEmail(email);
    if (existingAdmin.success && existingAdmin.data) {
      return NextResponse.json({ message: "Admin with this email already exists." }, { status: 400 });
    }

    // Create the admin table if it doesn't exist
    await createAdminTable();
    
    // Create a new admin with hashed password
    await createAdmin(name, email, password, "Manager");

    // Create a successful response with a cookie
    const response = NextResponse.json({ message: "Admin created." }, { status: 201 });
    response.cookies.set("email", email, { httpOnly: true, secure: process.env.NODE_ENV === "production", maxAge: 60 * 60 * 24 }); // Set secure cookies

    return response;
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
