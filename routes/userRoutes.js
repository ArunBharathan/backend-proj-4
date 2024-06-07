import { Router } from "express";
import { userModel } from "../models/userModel.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find().select({ username: 1, _id: 1 });
    console.log("users", users);
    res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  console.log("req.body", req.body);
  const { username } = req?.body;
  try {
    const user = new userModel({
      username,
    });
    const newUser = await user.save();
    res.status(201).json({
      username: newUser.username,
      _id: newUser._id,
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
