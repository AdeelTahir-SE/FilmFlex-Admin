// File: /app/api/update-profile/route.js
import { changeEmailOfAdmin } from "@/DB/Admin";
import connection from "@/DB/connectDB";

export async function PUT(request) {
  try {

    // Parse the request body (name and email)
    const { name, email } = await request.json();
    const admin = request.cookies.get("adminid");
    const adminId=admin.value;
console.log(name,email,adminId)
    if (!name || !email || !adminId) {
      return new Response("Name and Email are required", { status: 400 });
    }

    const result = await changeEmailOfAdmin(name, email.toString(),adminId);

    if (result) {
      return new Response(JSON.stringify({ message: "Profile updated successfully" }), {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    } else {
      return new Response("Failed to update profile", { status: 500 });
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Failed to update profile", { status: 500 });
  }
}
