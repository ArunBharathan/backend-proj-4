import { Model, Schema, Types } from "mongoose";

const logsSchema = new Schema({
  userId: {
    type: Types.ObjectId,
  },
  exerciseId: {
    type: Types.ObjectId,
  },
});

const logsModel = Model("Logs", logsSchema);

export { logsModel };
