import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import bodyParser from "body-parser";

import exerciseRouter from "./routes/exerciseRoutes.js";
import userRouter from "./routes/userRoutes.js";
import { userValidation } from "./middleware/userValidation.js";

import mongoose from "mongoose";
import logRouter from "./routes/logsRoutes.js";
import { exerciseModel } from "./models/exerciseModel.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  console.log("dirname", __dirname);
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRouter);
// app.post("/api/users/:id/exercises", exerciseRouter);
app.use("/api/users/:_id/exercises", userValidation, exerciseRouter);
app.use("/api", logRouter);
app.get("/api/update-dates", async (req, res) => {
  const exercises = await exerciseModel.find();
  console.log("exercises before", exercises);

  await exercises.forEach(async (exercise) => {
    exercise.date = new Date(exercise.date);
    await exercise.save();
  });
  console.log("exercises after", exercises);
  res.json({ message: "Dates updated" });
});

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
