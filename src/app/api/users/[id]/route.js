
import connectDB from "@/db/connect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {

    const { id } = params;

    // connect mongodb
    await connectDB();

    // find user on the basis of id
    const user = await User.findById({ _id: id }).select("-password");
    // console.log(user);

    // if user does not exist show error
    if (!user) {
        return NextResponse.json({
            message: "User does not exist",
            success: false,
        }, {
            status: 400
        })
    }

    return NextResponse.json({
        message: "User found",
        success: true,
        user
    }, {
        status: 200
    })
}