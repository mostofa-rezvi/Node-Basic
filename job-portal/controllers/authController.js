import userModel from "../models/userModel.js";

export const registerController = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { name, email, password } = req.body;

    //validate
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide name." });
    }
    if (!email) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide email." });
    }
    if (!password) {
      return res
        .status(400)
        .send({ success: false, message: "Please provide password." });
    }

    const exisitingUser = await userModel.findOne({ email });
    if (exisitingUser) {
      return res.status(200).send({
        success: false,
        message: "Email Already Register, Please Login.",
      });
    }

    const user = await userModel.create({ name, email, password });
    res.status(201).send({
      success: true,
      message: "User Created Successfully.",
      user,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in register controller.",
      success: false,
      error,
    });
  }
};
