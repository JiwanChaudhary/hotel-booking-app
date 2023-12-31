import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
    }
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User