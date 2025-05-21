const Joi = require("joi");

exports.userValidation = (body) => {
  const schema = Joi.object({
    user_name: Joi.string().min(2).max(100).required(),
    user_email: Joi.string().email().required(),
    user_password: Joi.string().min(6).required(),
    user_info: Joi.string().allow(""),
    user_photo: Joi.string().uri().allow(""),
    user_is_active: Joi.boolean(),
  });

  return schema.validate(body);
};
