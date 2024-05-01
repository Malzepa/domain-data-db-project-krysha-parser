import mongoose from "mongoose";

export default async function connectToDatabase() {
  let timeout = 25;
  while (mongoose.connection.readyState === 0) {
    if (timeout === 0) {
      console.log("timeout");
      throw new Error("timeout occurred with mongoose connection");
    }
    try {
      await mongoose.connect("mongodb://localhost:27017/krisha-parcer-ads");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      timeout--;
    }
  }
  console.log("Database connection status:", mongoose.connection.readyState);
}
