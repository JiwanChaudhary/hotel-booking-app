import connectDB from "@/db/connect";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";

// create room
export async function POST(request) {
    await connectDB();
    const { name, maxCount, phoneNumber, rentPerDay, imageUrls, currentBookings, type, description } = await request.json();

    const room = await Room.create({ name, maxCount, phoneNumber, rentPerDay, imageUrls, currentBookings, type, description });

    return NextResponse.json({ message: "Success", room }, { status: 201 });

}

// get all rooms
export async function GET(request) {
    await connectDB();

    const room = await Room.find({});

    return NextResponse.json({
        message: "All rooms",
        nbHits: room.length,
        room
    }, {
        status: 200
    });

}