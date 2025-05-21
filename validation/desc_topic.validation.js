const Joi = require("joi");

const topicSchema = Joi.object({
  author_id: Joi.number().integer().required(),
  topic_title: Joi.string().min(5).required(),
  topic_text: Joi.string().min(10).required(),
  is_checked: Joi.boolean(),
  is_approved: Joi.boolean(),
  expert_id: Joi.number().integer().allow(null),
});

module.exports = { topicSchema };
