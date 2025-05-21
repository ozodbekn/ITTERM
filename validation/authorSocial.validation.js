exports.authorSocialValidation = (body) => {
  const schema = Joi.object({
    author_id: Joi.string().hex().length(24).required(),
    social_name: Joi.string().trim().required(),
    social_url: Joi.string().uri().required(),
  });

  return schema.validate(body);
};
