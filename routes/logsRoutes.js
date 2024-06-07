import { Router } from "express";
import { logsModel } from "../models/logsExercise.js";
import { userModel } from "../models/userModel.js";
import mongoose from "mongoose";

const router = Router();

router.get("/users/:_id/logs", async (req, res) => {
  console.log("params", req.params);
  console.log("query", req.query);
  const { _id } = req.params;
  const { from, to, limit } = req.query;
  const aggregatePipeline = [
    {
      $match: { userId: mongoose.Types.ObjectId(_id) },
    },
    {
      $lookup: {
        from: "exercises",
        localField: "exerciseId",
        foreignField: "_id",
        as: "userExercises",
      },
    },
    {
      $unwind: "$userExercises",
    },
  ];

  if (limit) {
    aggregatePipeline.push({ $limit: parseInt(limit) });
  }
  if (from || to) {
    const dateFilter = {};
    if (from) {
      dateFilter.$gte = new Date(from).toDateString();
    }
    if (to) {
      dateFilter.$lte = new Date(to).toDateString();
    }
    aggregatePipeline.push({
      $match: {
        "userExercises.date": dateFilter,
      },
    });
  }
  console.log("aggregatePipeline", JSON.stringify(aggregatePipeline));
  aggregatePipeline.push({
    $group: {
      _id: "$userId",
      username: { $first: "$username" },
      count: { $sum: 1 },
      logs: {
        $push: {
          description: "$userExercises.description",
          duration: "$userExercises.duration",
          date: "$userExercises.date",
        },
      },
    },
  });

  const userLogs = await logsModel.aggregate(aggregatePipeline);
  console.log("userLogs", userLogs);
  [{ $limit: 0 }];
  // res.send("logs");
  res.json(userLogs);
});

export default router;
