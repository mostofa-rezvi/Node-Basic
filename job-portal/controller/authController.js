import userModel from "../model/userModel.js";

// Register User
export const registerController = async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return next("Name, email, and password are required.");
  }

  const existingUser = await userModel.findOne({ email });
  if (existingUser) return next("Email already registered. Please login.");

  const user = await userModel.create({ name, email, password });
  const token = user.createJWT();

  res.status(201).json({
    success: true,
    message: "User registered successfully.",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

// Login User
export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) return next("Please provide all fields.");

  const user = await userModel.findOne({ email }).select("+password");
  if (!user) return next("Invalid email or password.");

  const isMatch = await user.comparePassword(password);
  if (!isMatch) return next("Invalid email or password.");

  const token = user.createJWT();

  res.status(200).json({
    success: true,
    message: "Login successful.",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
