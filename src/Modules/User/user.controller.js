import { User } from "../../../Database/Models/user.model.js";
import { catchError } from "../../utils/catchError.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "../../utils/sendEmail.js";
import { AppError } from "../../utils/appError.js";

const signup = catchError(async (req, res) => {
  req.body.password = await bcrypt.hash(req.body.password, 8);
  req.body.otp = Math.floor(100000 + Math.random() * 900000);
  let user = await User.insertMany(req.body);
  sendEmail(req.body.email, user[0].otp);
  user[0].password = undefined;
  res.status(200).json({ message: "Success", user });
});

const signin = catchError(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });
  jwt.sign({ email: user.email, id: user._id }, "Morsy", (err, token) => {
    res.status(200).json({ message: "Success", token });
  });
});

const otpValidation = catchError(async (req, res, next) => {
  let user = await User.findById({ _id: req.params.id });
  if (!user) {
    next(new AppError("User Not Found", 404));
  } else {
    if (user.otp === req.body.otp) {
      user.otp = undefined;
      await User.findByIdAndUpdate(
        { _id: req.params.id },
        { confirmEmail: true }
      );
      res.status(200).json({ message: "Success" });
    } else {
      next(new AppError("Invalid OTP", 409));
    }
  }
});

export { signup, signin, otpValidation };
