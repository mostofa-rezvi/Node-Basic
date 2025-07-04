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
