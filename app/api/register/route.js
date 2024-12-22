// pages/api/register.js

import { NextResponse } from "next/server";
import { createAdmin } from "@/DB/Admin";

export async function POST(request) {
  const { name, email, password } = await request.json();

  // Check for missing fields
  if (!email || !password || !name) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  // Handle Admin Creation
  try {
    const { success, data } = await createAdmin(name, email, password);
    if (success) {
      const response = NextResponse.json({ message: "Admin created." }, { status: 201 });
      response.cookies.set("adminid", data.adminId, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });

      return response;
    } else {
      return NextResponse.json({ message: "Failed to create admin." }, { status: 500 });
    }
  } catch (error) {
    console.error("Error creating admin:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
