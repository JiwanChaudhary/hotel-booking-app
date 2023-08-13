import connectDB from "@/db/connect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";


export async function POST(request) {

    // get email and password from user
    const { email, password } = await request.json();
    // console.log(email, password);

    // connect mongodb
    await connectDB();

    // check if email and password field are empty
    if (!email || !password) {
        return NextResponse.json({
            message: "All fields are required",
            success: false
        }, {
            status: 400
        })
    }

    // find user on the basis of email
    const user = await User.findOne({ email });
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

    // compare user password with mondb password
    const comparePassword = await bcrypt.compare(password, user.password);
    // console.log(comparePassword);
    if (!comparePassword) {
        return NextResponse.json({
            message: "password did not match",
            success: false,
        }, {
            status: 400
        })
    }

    // create token data
    const tokenData = {
        id: user._id,
        name: user.name,
    }

    // create token
    const token = await jwt.sign(tokenData, process.env.JWT_SECRET, { expiresIn: '100d' })

    const response = await NextResponse.json({
        message: "User found",
        success: true,
    }, {
        status: 200
    })

    response.cookies.set("token", token, {
        httpOnly: true
    })

    return response
}