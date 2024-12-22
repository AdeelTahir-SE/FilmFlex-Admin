// pages/api/signin.js

import { NextResponse } from "next/server";
import { Signin } from "@/DB/Admin";  // Import the Signin function from your DB file

export async function POST(request) {
  const { email, password } = await request.json();

  // Check for missing fields
  if (!email || !password) {
    return NextResponse.json({ message: "Missing required fields." }, { status: 400 });
  }

  // Handle Admin Sign-In using the Signin function from DB
  try {
    const result = await Signin(email, password);
    
    if (result.success) {
      const response = NextResponse.json({ message: "Sign-in successful." }, { status: 200 });
      response.cookies.set("adminid", result.data, {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 1000,
        path: "/",
      });
      return response;
    } else {
      return NextResponse.json({ message: result.message || "Invalid email or password." }, { status: 400 });
    }
  } catch (error) {
    console.error("Error signing in:", error);
    return NextResponse.json({ message: "Server error." }, { status: 500 });
  }
}
