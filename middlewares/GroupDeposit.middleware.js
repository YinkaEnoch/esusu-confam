import Joi from "joi";

const groupSchema = Joi.object({
  username: Joi.string().required().trim(),
  amount: Joi.number().required().min(1),
});

const ValidateGroupDesposit = (req, res, next) => {
  const { value, error } = groupSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ code: 1, type: "ERR", message: error.details[0].message });

  req.body.validated = value;
  next();
};

export default ValidateGroupDesposit;
