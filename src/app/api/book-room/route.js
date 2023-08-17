import connectDB from "@/db/connect";
import Booking from "@/models/bookingSchema";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(request) {
    await connectDB();
    const { room,
        fromDate,
        toDate,
        totalAmount,
        totalDays } = await request.json();

    const token = await request.cookies.get("token")?.value

    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodeToken);

    const newBooking = new Booking({
        room: room.name,
        userId: decodeToken.id,
        roomId: room._id,
        fromDate,
        toDate,
        totalAmount,
        totalDays,
        transactionId: '1234'
    })

    const booking = await newBooking.save();

    const roomCurrentBooking = await Room.findOne({ _id: room._id });

    roomCurrentBooking.currentBookings.push({
        bookingId: booking._id,
        fromDate,
        toDate,
        userId: '64d8fec0213741d86636c2fc',
        status: booking.status,
    })

    await roomCurrentBooking.save();

    return NextResponse.json({
        message: "success",
        success: true,
        booking
    }, {
        status: 200
    })



}