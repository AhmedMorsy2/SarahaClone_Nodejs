import { Schema, model } from "mongoose";

function getCurrentTime() {
  const now = new Date();
  return now.toTimeString().split(" ")[0];
}

const schema = new Schema(
  {
    name: String,
    email: String,
    password: String,
    confirmEmail: {
      default: false,
      type: Boolean,
    },
    otp: String,
    otpExpire: {
      type: Date,
      default: new Date(),
    },
  },
  {
    versionKey: false,
  }
);

export const User = model("User", schema);
