import React from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
export default function NotificationCard({
    image,
    time,
    title,
    message,
    onClose,
}) {
    return (
        <div className="mb-4 bg-gradient-to-r from-red-600 via-red-950 to-black flex flex-row items-center  pl-0 ml-0">
            <Image src={image} className="w-36 object-cover " alt={title} />
            <div className="flex flex-col gap-2 mx-7">
                <h1 className="text-2xl text-white font-bold">{title}</h1>
                <p className="text-white">{message}</p>
            </div>
            <div>
                <p className="text-white">{time}</p>
                <Button className="bg-red-700 hover:bg-red-500" onClick={onClose}>Close</Button>
            </div>
        </div>
    );
}