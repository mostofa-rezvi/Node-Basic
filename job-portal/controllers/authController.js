import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  console.log("Request Body:", req.body);

  const { name, email, password } = req.body;

  //validate
  if (!name) {
    next("Name is Required.");
  }
  if (!email) {
    next("Email is Required.");
  }
  if (!password) {
    next("Password is Required & greater than 4 character.");
  }

  const exisitingUser = await userModel.findOne({ email });
  if (exisitingUser) {
    next("Email Already Register, Please Login.");
  }

  const user = await userModel.create({ name, email, password });

  // token
  const token = user.createJWT();

  res.status(201).send({
    success: true,
    message: "User Created Successfully.",
    user: {
      name: user.name,
      lastName: user.lastName,
      email: user.email,
      location: user.location,
    },
    token,
  });
};

export const loginController = async (req, res, next) => {
  const { email, password } = req.body;

  //validation
  if (!email || !password) {
    return next("Please provide all fields.");
  }

  // find user by email
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next("Invalid Username or Password");
  }

  // compare password
  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    return next("Invalid Username or Password");
  }

  const token = user.createJWT();

  res.status(200).json({
    success: true,
    message: "Login Successful",
    user: {
      name: user.name,
      email: user.email,
      location: user.location,
    },
    token,
  });
};
