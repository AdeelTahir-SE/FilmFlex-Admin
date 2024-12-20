// File: /app/api/update-profile/route.js
import { changeAdminPassword } from "@/DB/Admin";
import connection from "@/DB/connectDB";

export async function PUT(request) {
  try {

    // Parse the request body (name and email)
    const { currentPassword,newPassword } = await request.json();

    if (!currentPassword|| !newPassword) {
      return new Response("password must ne entered are required", { status: 400 });
    }

    // Update the email of the admin in the database
    const result = await changeAdminPassword(currentPassword, newPassword);

    if (result) {
      return new Response(JSON.stringify({ message: "Profile updated successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response("Failed to change password", { status: 500 });
    }
  } catch (error) {
    console.error("Error changing password:", error);
    return new Response("Failed to changing password", { status: 500 });
  }
}
