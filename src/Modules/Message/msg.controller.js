import { Msg } from "../../../Database/Models/message.model.js";
import { AppError } from "../../utils/appError.js";
import { catchError } from "../../utils/catchError.js";

const addMsg = catchError(async (req, res) => {
  req.body.receiverId = req.params.id;
  let msg = await Msg.insertMany(req.body);
  res.status(200).json({ message: "Message added successfully", msg });
});

const deleteMsg = async (req, res) => {
  await Msg.findByIdAndDelete({ _id: req.params.id });
  res.status(200).json({ message: "Message deleted successfully" });
};

const userMsgs = async (req, res, next) => {
  let msgs = await Msg.find({ receiverId: req.user.id });
  if (msgs.length > 0) {
    res.status(200).json({ message: "Success", messages: msgs });
  } else {
    next(new AppError("There is no Messages", 404));
  }
};

export { addMsg, deleteMsg, userMsgs };
