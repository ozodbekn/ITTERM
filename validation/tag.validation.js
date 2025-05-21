const Joi = require("joi");

const tagSchema = Joi.object({
  topic_id: Joi.number().integer().required(),
  category_id: Joi.number().integer().required(),
});

module.exports = { tagSchema };
