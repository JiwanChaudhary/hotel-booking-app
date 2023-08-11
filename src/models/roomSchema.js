import mongoose from "mongoose";

const roomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter name"],
    },
    maxCount: {
        type: Number,
        required: [true, "Please enter count"],
    },
    phoneNumber: {
        type: Number,
        required: [true, "Please enter number"],
    },
    rentPerDay: {
        type: Number,
        required: [true, "Please enter rent per day"],
    },
    imageUrls: {
        type: Array,
    },
    currentBookings: {
        type: Array,
    },
    type: {
        type: String,
        required: [true, "Please select room type"],
    },
    description: {
        type: String,
        required: [true, "please add description"]
    }
}, {
    timestamps: true,
})

const Room = mongoose.models.Room || mongoose.model("Room", roomSchema);

export default Room