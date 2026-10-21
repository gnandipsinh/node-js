
import mongoose from "mongoose";

const connectDB = async () => {
  try {
    if (!process.env.MONGODB_URI) {
      throw new Error("MONGODB_URI is missing in .env");
    }

    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Database connected successfully");

    return true;
  } catch (error) {
    console.error("Database connection error:", error.message);
    return false;
  }
};

export default connectDB;
