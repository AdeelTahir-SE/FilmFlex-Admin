import { NextResponse } from "next/server";
import { getAllNotifications } from "@/DB/NotificationAdmin";
import { deleteNotification } from "@/DB/NotificationAdmin";
export async function GET(request) {
    const email=request.cookies.email;
    return await getAllNotifications(email);
}

export async function POST(request) {
    try{
    const email=request.cookies.email;
    const {id} = await request.json();
    const response= await deleteNotification(id,email);
    return NextResponse.json({message:"Notification deleted successfully"},{status:200});

    }
    catch(error){
        console.error("Failed to delete notification:", error);
        return NextResponse.json({message:"Failed to delete notification"},{status:500});
    }
}