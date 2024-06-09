import { Router } from "express";
import { exerciseModel } from "../models/exerciseModel.js";
import { userModel } from "../models/userModel.js";
import { logsModel } from "../models/logsExercise.js";
import { userValidation } from "../middleware/userValidation.js";
import mongoose from "mongoose";

const router = Router();

const ObjectId = mongoose.Types.ObjectId;

router.post("/", async (req, res) => {
  const { description, duration, date } = req.body;
  const { _id: userId } = req.user;
  console.log("param and body", req.params, req.body, "-", req?.user);
  const user = await userModel.findById(ObjectId(userId));
  console.log("user", user);
  const exercise = await new exerciseModel({
    description,
    duration: parseInt(duration),
    date: date ? new Date(date) : new Date(),
    userId: user._id,
    username: user.username,
  }).save();
  console.log("exercise", exercise);
  const log = await new logsModel({
    userId: user._id,
    exerciseId: exercise._id,
    username: user.username,
  }).save();
  console.log("log", log);
  if (exercise) {
    res.status(201).json({
      _id: user?._id,
      username: user?.username,
      description: exercise?.description,
      duration: exercise?.duration,
      date: new Date(exercise?.date).toDateString(),
    });
  }
});

export default router;
