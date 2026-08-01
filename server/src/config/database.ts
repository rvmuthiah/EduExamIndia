import mongoose from "mongoose";

const connectDB = async (): Promise<void> => {
  try {
    console.log("🔄 Starting MongoDB connection...");
    console.log("📍 URI:", process.env.MONGODB_URI);

    const conn = await mongoose.connect(process.env.MONGODB_URI as string, {
      serverSelectionTimeoutMS: 10000,
    });

    console.log("✅ MongoDB Connected");
    console.log(`📦 Database Host: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Failed");
    console.error(error);
    process.exit(1);
  }
};

export default connectDB;