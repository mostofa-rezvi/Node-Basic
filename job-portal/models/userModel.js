import mongoose from "mongoose";
import validator from "validator";

// schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Require."],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: [true, "Email is Require."],
      unique: true,
      validate: validator.isEmail,
    },
    password: {
      type: String,
      required: [true, "Password is Require."],
    },
    location: {
      type: String,
      default: "Dhaka",
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
