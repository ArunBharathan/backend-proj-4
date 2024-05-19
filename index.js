import express from "express";
const app = express();
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";

import { router as exerciseRouter } from "./routes/exerciseRoutes.js";
import { router as userRouter } from "./routes/userRoutes.js";
// import { router as logsRouter } from "./routes/logsRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.static("public"));
app.get("/", (req, res) => {
  console.log("dirname", __dirname);
  res.sendFile(__dirname + "/views/index.html");
});

app.use("/api/users", userRouter);
app.user("/api/users/:_id/exercises", exerciseRouter);

const listener = app.listen(process.env.PORT || 3000, () => {
  console.log("Your app is listening on port " + listener.address().port);
});
