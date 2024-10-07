import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const db = async () => {
  try {
    console.log(process.env.MONGO_URI);
    const conn = await mongoose.connect(process.env.MONGO_URI || "mongodb://localhost:27017/movies");
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1); // Exit the process with failure
  }
};

export default db;
