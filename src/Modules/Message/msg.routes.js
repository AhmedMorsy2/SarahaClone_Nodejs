import { Router } from "express";
import { checkToken } from "../../utils/tokenCheck.js";
import { addMsg, deleteMsg, userMsgs } from "./msg.controller.js";
import { validations } from "../../utils/validation.js";
import { msgVal } from "./msg.validation.js";

const msgRouter = Router();

msgRouter.use(checkToken);
msgRouter.post("/:id", validations(msgVal), addMsg);
msgRouter.delete("/delete/:id", deleteMsg);
msgRouter.get("/", userMsgs);

export default msgRouter;
