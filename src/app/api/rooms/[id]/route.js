import connectDB from "@/db/connect";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";

export async function POST(request, { params }) {
    await connectDB();
    try {
        const { id } = params;
        // console.log(id);

        const room = await Room.findById(id);
        // console.log(room);

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