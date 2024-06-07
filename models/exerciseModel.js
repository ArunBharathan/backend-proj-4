import mongoose from "mongoose";

const exerciseSchema = new mongoose.Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
  },
  date: {
    type: Date,
  },
  username: {
    type: String,
    required: true,
  },
});

const exerciseModel = mongoose.model("Exercise", exerciseSchema);

export { exerciseModel };
