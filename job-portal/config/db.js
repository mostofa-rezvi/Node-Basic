import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URL);
    console.log(
      `Connected to MongoDB Database ${mongoose.connection.host}`.bgMagenta
        .black
    );
  } catch (err) {
    console.log(`MongoDB Error ${err}`.bgRed.white);
  }
};

export default connectDB;