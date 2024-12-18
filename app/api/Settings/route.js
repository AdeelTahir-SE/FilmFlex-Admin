import connection from "@/DB/connectDB";

export async function PUT(request) {
  try {
    const { name, email } = await request.json();

    // Update user profile information in the database
    const [result] = await connection.query(
      "UPDATE users SET name = ?, email = ? WHERE id = ?",
      [name, email, 1] // Replace `1` with the authenticated user ID
    );

    return Response.json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Error updating profile:", error);
    return new Response("Failed to update profile", { status: 500 });
  }
}
