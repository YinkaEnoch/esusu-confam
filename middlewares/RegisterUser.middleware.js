import Joi from "joi";

const regSchema = Joi.object({
  username: Joi.string().trim().required(),
  password: Joi.string().trim().required(),
  confirmPassword: Joi.string()
    .trim()
    .required()
    .valid(Joi.ref("password"))
    .messages({ "any.only": "confirm password must match password" }),
  firstName: Joi.string().trim().required(),
  lastName: Joi.string().trim().required(),
  email: Joi.string().trim().email().required(),
});

const validateRegInfo = (req, res, next) => {
  const { value, error } = regSchema.validate(req.body);

  if (error)
    return res
      .status(400)
      .json({ code: 1, type: "ERR", message: error.details[0].message });

  req.body.validated = value;
  next();
};

export default validateRegInfo;
