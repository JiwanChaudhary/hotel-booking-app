import connectDB from "@/db/connect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


export async function POST(request) {
    await connectDB();
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
        return NextResponse.json({
            message: "All fields are required",
            success: false
        }, {
            status: 400
        })
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password: hashedPassword });
    // console.log(user);

    if (user) {
        return NextResponse.json({
            message: "User Created Successfully",
            success: true,
            user,
        }, {
            status: 201
        })
    } else {
        return NextResponse.json({
            message: "Something went wrong",
            success: false,
        }, {
            status: 400
        })
    }
}