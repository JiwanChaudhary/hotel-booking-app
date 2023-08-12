import connectDB from "@/db/connect";
import User from "@/models/userSchema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";


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
    if(!comparePassword){
        return NextResponse.json({
            message: "password did not match",
            success: false,
        }, {
            status: 400
        })
    }

    // if user exist and password match then show result
    if (user && comparePassword) {
        return NextResponse.json({
            message: "User found",
            success: true,
            user,
        }, {
            status: 200
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