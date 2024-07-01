import Joi from "joi";
export const msgVal = Joi.object({
  content: Joi.string().required(),
  id: Joi.string().required(),
});
