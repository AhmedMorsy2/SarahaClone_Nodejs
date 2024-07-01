import mongoose, { Schema, model } from "mongoose";

const schema = new Schema(
  {
    content: String,
    receiverId: { type: mongoose.Types.ObjectId, ref: "User" },
  },
  {
    versionKey: false,
  }
);

export const Msg = model("Msg", schema);
