import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    return true;
  } catch (error) {
    console.log(error.message);

    return false;
  }
};

export default connectDB;
