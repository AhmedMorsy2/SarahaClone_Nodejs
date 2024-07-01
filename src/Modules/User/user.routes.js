import { Router } from "express";
import { checkEmail, checkExist } from "../../Middlewares/user.middleware.js";
import { otpValidation, signin, signup } from "./user.controller.js";
import { validations } from "../../utils/validation.js";
import { signinVal, signupVal } from "./user.validation.js";

const userRouter = Router();

userRouter.post("/signup", validations(signupVal), checkEmail, signup);
userRouter.post("/signin", validations(signinVal), checkExist, signin);
userRouter.post("/otpvalidation/:id", otpValidation);
export default userRouter;
