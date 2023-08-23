import connectDB from "@/db/connect";
import Booking from "@/models/bookingSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
    await connectDB();

    // use id
    const { id } = params;

    // find room by id
    const room = await Booking.find({ userId: id });
    // console.log(room);

    return NextResponse.json({
        message: "Room Found",
        success: true,
        room
    })

}