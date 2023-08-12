import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"]
    },
    email: {
        type: String,
        required: [true, "Please enter email"]
    },
    password: {
        type: String,
        required: [true, "Please enter password"]
    },
    isAdmin: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User