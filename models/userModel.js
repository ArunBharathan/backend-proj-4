import { Mongoose, Model, Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
  },
});

const userModel = Mongoose.model("User", userSchema);

export { userModel };
