import { NextResponse } from "next/server";
import { getAllNotifications } from "@/DB/NotificationAdmin";
export async function GET(request) {
    const email=request.cookies.email;
    return await getAllNotifications(email);
}