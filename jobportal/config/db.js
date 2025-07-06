import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URL);
    console.log(`MongoDB Connected: ${conn.connection.host}`.bgMagenta.black);
  } catch (error) {
    console.error(`MongoDB Connection Failed: ${error.message}`.bgRed.white);
    process.exit(1);
  }
};

export default connectDB;
