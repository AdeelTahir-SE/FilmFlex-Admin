import { NextResponse } from "next/server";
import { createAdmin } from "@/DB/Admin";
import { createAdminTable } from "@/DB/Admin";

export async function POST(request) {
  console.log("Request received");
  const formData = await request.formData();
  const { name, email, password }=Object.fromEntries(formData);
 
  console.log("Received data:", email, password, name);

  if (!email || !password || !name) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  try {
    await createAdminTable();
     await createAdmin(name, email, password, "Manager");

    const response = NextResponse.json({ message: "Admin created." }, { status: 201 });
    response.cookies.set("email", email);
    return response;
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
