const Joi = require("joi");
const mongoose = require("mongoose");

exports.descQAValidation = (body) => {
  const schema = Joi.object({
    qa_id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid qa_id");
        }
        return value;
      })
      .required(),

    desc_id: Joi.string()
      .custom((value, helpers) => {
        if (!mongoose.Types.ObjectId.isValid(value)) {
          return helpers.message("Invalid desc_id");
        }
        return value;
      })
      .required(),
  });

  return schema.validate(body);
};
