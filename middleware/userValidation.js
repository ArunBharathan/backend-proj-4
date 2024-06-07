import mongoose from "mongoose";
import { userModel } from "../models/userModel.js";

const ObjectId = mongoose.Types.ObjectId;
const userValidation = async (req, res, next) => {
  console.log("userValidation", req.params, req.body);
  const params = { ...req.params };
  console.log("params", params);
  const _id = params._id;
  if (mongoose.isValidObjectId(_id)) {
    const user = await userModel.findById(_id);
    console.log("user", user, _id);
    if (user) {
      console.log("user found");
      req.user = user;
      return next();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid user id" });
  }
  next();
};

export { userValidation };
