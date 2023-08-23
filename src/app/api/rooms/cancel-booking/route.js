import connectDB from "@/db/connect";
import Booking from "@/models/bookingSchema";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";


export async function PUT(request) {
    await connectDB();
    const { bookingId } = await request.json();

    // booking
    const bookingItem = await Booking.findByIdAndUpdate({ _id: bookingId }, { status: "cancelled" }, { new: true });
    await bookingItem.save();

    return NextResponse.json({
        message: "Room updated to cancelled  Successfully!",
        success: true,
    }, {
        status: 200
    })
}

export async function POST(request) {
    await connectDB()
    const { roomId, bookingId } = await request.json();
    // console.log("roomId", roomId);
    const userBookingId = bookingId;
    // console.log("bookingId", userBookingId);

    // room
    const room = await Room.findOne({ _id: roomId });
    // console.log(room);
    const bookings = room.currentBookings;
    // console.log(bookings);
    const updateBooking = bookings.filter(booking => booking.bookingId.toString() !== userBookingId)
    // console.log(updateBooking);
    room.currentBookings = updateBooking;
    // console.log(room.currentBookings);
    // const bookingIds = bookings.map(booking => booking.bookingId.toString());

    // console.log("bookingIds", bookingIds);

    await room.save();

    return NextResponse.json({
        message: "Room Cancelled From Current Booking Successfully!",
        success: true,
    }, {
        status: 200
    })
}