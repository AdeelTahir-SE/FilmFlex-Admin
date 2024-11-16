import { NextResponse } from "next/server";
import { createAdmin } from "@/DB/Admin";
export async function POST(request) {
    const formdata=await request.formData();
const email=formdata.get("email");
const password=formdata.get("password");
const name=formdata.get("name");
const result=await createAdmin(name,email,password,"Manager");
const response= NextResponse.redirect("/dashboard");
response.cookies.set("email",email);

}