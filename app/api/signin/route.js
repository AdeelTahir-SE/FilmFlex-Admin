import { NextResponse } from "next/server";
import { getAdminByEmail } from "@/DB/Admin";
export async function POST(request) {
    const formdata=await request.formData();
const email=formdata.get("email");
const password=formdata.get("password");
const rows=await getAdminByEmail(email,password);
if(rows.length>0){
    return NextResponse.redirect("/dashboard");
}
}
