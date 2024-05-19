import { Router } from "express";
import { userModel } from "../models/userModel";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const users = await userModel.find();
    res.status(200).json(users);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: error.message });
  }
});

router.post("/", async (req, res) => {
  const { username } = req.body;
  try {
    const user = new userModel({
      username,
    });
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});
