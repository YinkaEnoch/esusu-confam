import Joi from "joi";

const groupSchema = Joi.object({
  groupName: Joi.string().required().trim(),
  isPublic: Joi.boolean(),
  savingsAmount: Joi.number().required().min(1),
  admin: Joi.string().required().trim(),
  maxMember: Joi.number(),
});

const validateGroupInfo = (req, res, next) => {
  const { value, error } = groupSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ code: 1, type: "ERR", message: error.details[0].message });

  req.body.validated = value;
  next();
};

export default validateGroupInfo;
