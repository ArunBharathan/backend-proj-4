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
      dateFilter.$gte = new Date(from);
    }
    if (to) {
      dateFilter.$lte = new Date(to);
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
      log: {
        $push: {
          description: "$userExercises.description",
          duration: "$userExercises.duration",
          date: "$userExercises.date",
        },
      },
    },
  });

  const userLogs = await logsModel.aggregate(aggregatePipeline);
  // console.log("userLogs", JSON.stringify(userLogs));
  let formatedLogs = userLogs[0] || {
    _id: _id,
    username: req.user?.username,
    count: 0,
    log: [],
  };
  formatedLogs.log =
    formatedLogs?.log?.length > 0
      ? formatedLogs?.log?.map((l) => ({
          ...l,
          date: new Date(l?.date).toDateString(),
        }))
      : [];
  console.log("***", JSON.stringify(formatedLogs));
  // res.send("logs");
  res.json(formatedLogs);
});

export default router;
