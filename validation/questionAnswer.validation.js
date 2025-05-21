const Joi = require("joi");

exports.questionAnswerValidation = (body) => {
  const schema = Joi.object({
    question: Joi.string().trim().required(),
    answer: Joi.string().trim().required(),
    topic_id: Joi.string().hex().length(24).required(),
    author_id: Joi.string().hex().length(24).required(),
  });

  return schema.validate(body);
};
