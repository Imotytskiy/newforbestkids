import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGODB_URI}/e-commerce`);
    console.log("DB connected");
  } catch (error) {
    console.error("DB connection failed:", error);
  }
};

export default connectDB;
