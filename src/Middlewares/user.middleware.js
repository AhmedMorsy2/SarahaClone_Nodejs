import { User } from "../../Database/Models/user.model.js";
import { AppError } from "../utils/appError.js";
import bcrypt from "bcrypt";

const checkEmail = async (req, res, next) => {
  let isFound = await User.findOne({ email: req.body.email });
  if (isFound) return next(new AppError("Email Already Exist", 409));
  else {
    next();
  }
};

const checkExist = async (req, res, next) => {
  let user = await User.findOne({ email: req.body.email });
  if (!user || !bcrypt.compareSync(req.body.password, user.password))
    return next(new AppError("Incorrect Email or Password", 404));
  else if (user.confirmEmail === false) {
    return next(new AppError("Check your inbox", 401));
  }
  next();
};

export { checkEmail, checkExist };
