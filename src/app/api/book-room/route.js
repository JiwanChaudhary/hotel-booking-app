import connectDB from "@/db/connect";
import Booking from "@/models/bookingSchema";
import Room from "@/models/roomSchema";
import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
// import Stripe from "stripe"
// import { v4 as uuidv4 } from 'uuid';

export async function POST(request) {
    // const stripe = new Stripe('sk_test_51NgWA8SD1kf6cpk36gIGqZEQM7az5QEih0Twkz9B7ubY56lwUk8XUFjNki3LsrKJLsdBmFQZV1UR68IXOCQHQFAp00Yo9SkULl');
    await connectDB();
    const { room,
        fromDate,
        toDate,
        totalAmount,
        totalDays } = await request.json();

    const token = await request.cookies.get("token")?.value

    const decodeToken = await jwt.verify(token, process.env.JWT_SECRET);
    // console.log(decodeToken);

    // stripe
    // const customer = await stripe.customers.create({
    //     email: decodeToken.email,
    //     source: decodeToken.id,
    // })

    // const payment = await stripe.charges.create({
    //     amount: totalAmount * 100,
    //     customer: customer.id,
    //     currency: 'inr',
    //     receipt_email: decodeToken.email
    // }, {
    //     idempotencyKey: uuidv4()
    // })
    // stripe in complete due to frontend error

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
        userId: decodeToken.id,
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