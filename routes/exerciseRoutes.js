import { Router } from "express";
import { exerciseModel } from "../models/exerciseModel";
import { userModel } from "../models/userModel";
import { logsModel } from "../models/logsExercise";
import { userValidation } from "../middleware/userValidation";

const router = Router();

router.post("/", userValidation, async (req, res) => {
  const { description, duration, date } = req.body;
  const { _id: userId } = req.params;
  const user = await userModel.findNyId(userId);
  const exercise = await new exerciseModel({
    description,
    duration: parseInt(duration),
    date,
    userId: user._id,
    username: user.username,
  }).save();
  const log = await new logsModel({
    userId: user._id,
    exerciseId: exercise._id,
  }).save();
  if (exercise) {
    res.status(201).json({
      username: user?.username,
      ...exercise,
    });
  }
});
