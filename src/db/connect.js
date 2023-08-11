import mongoose from "mongoose";

export default function connectDB() {
    try {
        mongoose.connect(process.env.MONGO_URI);

        const connection = mongoose.connection;

        connection.on("connected", () => {
            console.log("Connected to DB");
        })

        connection.on("error", () => {
            console.log("Error connecting to DB");
            process.exit();
        })
    } catch (error) {
        console.log("error" + error);
    }
}