import connection from "@/DB/connectDB";

// Handle GET requests
export async function GET(request) {
  try {
    // Query the database to fetch users
    const [rows] = await connection.execute("SELECT * FROM User");
    return new Response(JSON.stringify(rows), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Database error:", error.message);
    return new Response(
      JSON.stringify({ success: false, error: "Failed to fetch users" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
