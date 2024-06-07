import mongoose from "mongoose";

const logsSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  exerciseId: {
    type: mongoose.Schema.Types.ObjectId,
  },
  username: {
    type: String,
  },
});

const logsModel = mongoose.model("Logs", logsSchema);

export { logsModel };
