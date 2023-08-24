import connectDB from "@/db/connect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function GET(request) {
    await connectDB();

    const allUsers = await User.find({});

    if (allUsers) {
        return NextResponse.json({
            message: "All Users",
            nbHits: allUsers.length,
            success: true,
            allUsers
        }, {
            status: 200
        })
    } else {
        return NextResponse.json({
            message: "Something went Wrong",
            success: false,

        }, {
            status: 400
        })
    }
}