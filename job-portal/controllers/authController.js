import userModel from "../models/userModel.js";

export const registerController = async (req, res, next) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    //validate
    if (!name) {
      next("Name is Required.");

      // return res
      //   .status(400)
      //   .send({ success: false, message: "Please provide name." });
    }
    if (!email) {
      next("Email is Required.");

      // return res
      //   .status(400)
      //   .send({ success: false, message: "Please provide email." });
    }
    if (!password) {
      next("Password is Required & greater than 4 character.");

      // return res
      //   .status(400)
      //   .send({ success: false, message: "Please provide password." });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      next("Email Already Register, Please Login.");

      // return res.status(200).send({
      //   success: false,
      //   message: "Email Already Register, Please Login.",
      // });
    }

    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User Created Successfully.",
      user,
    });
  } catch (error) {
    next(error);

    // console.log(error);
    // res.status(400).send({
    //   message: "Error in register controller.",
    //   success: false,
    //   error,
    // });
  }
};
