import { Types, Schema } from "mongoose";
import { userModel } from "../models/userModel";

const userValidation = async (req, res, next) => {
  const { _id: userID } = req.params;
  if (Schema.Types.ObjectId.isValid(userID)) {
    const user = await userModel.findById(userID);
    if (user) {
      next();
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } else {
    res.status(400).json({ message: "Invalid user id" });
  }
};

export { userValidation };
