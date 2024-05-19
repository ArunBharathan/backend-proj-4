import { Schema, Model, Types, Mongoose } from "mongoose";

const exerciseSchema = new Schema({
  description: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  date: {
    type: String,
  },
  username: {
    type: String,
    required: true,
  },
});

const exerciseModel = Mongoose.model("Exercise", exerciseSchema);

export { exerciseModel };
