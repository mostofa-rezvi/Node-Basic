import userModel from "../models/userModel.js";

// Update User Info
export const updateUserController = async (req, res, next) => {
  const { name, email, location } = req.body;

  if (!name || !email || !location) {
    return next("All fields are required.");
  }

  const user = await userModel.findById(req.user.userId);
  user.name = name;
  user.email = email;
  user.location = location;
  await user.save();

  const token = user.createJWT();

  res.status(200).json({
    success: true,
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
