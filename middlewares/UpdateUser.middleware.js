import Joi from "joi";

const updateSchema = Joi.object({
  firstName: Joi.string().trim(),
  lastName: Joi.string().trim(),
  email: Joi.string().email().trim(),
});

const validateUpdateInfo = (req, res, next) => {
  const { value, error } = updateSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ code: 1, type: "ERR", message: error.details[0].message });

  req.body.validated = value;
  next();
};

export default validateUpdateInfo;
