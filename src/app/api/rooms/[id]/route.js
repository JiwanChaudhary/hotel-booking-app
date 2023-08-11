import connectDB from "@/db/connect";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";

export async function POST(request) {
    await connectDB();
    try {
        const roomId = await request.json();

        const room = await Room.findById({ _id: roomId });

        return NextResponse.json({
            message: "Room found",
            room,
        }, {
            status: 200
        })

    } catch (error) {
        return NextResponse.json({
            message: "No room",
        }, {
            status: 400
        })
    }
}