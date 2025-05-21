const Joi = require("joi");

exports.adminValidation = (body) => {
  const schema = Joi.object({
    admin_name: Joi.string().min(3).max(30).required().messages({
      "string.empty": "Admin ismi bo'sh bo'lmasligi kerak",
      "string.min": "Admin ismi kamida 3 ta belgidan iborat bo'lishi kerak",
      "string.max": "Admin ismi 30 tadan oshmasligi kerak",
    }),
    admin_email: Joi.string().email().required().messages({
      "string.email": "Email noto‘g‘ri formatda",
      "any.required": "Email kiritilishi shart",
    }),
    admin_phone: Joi.string()
      .pattern(/^\d{2}-\d{3}-\d{2}-\d{2}$/)
      .required()
      .messages({
        "string.pattern.base":
          "Telefon raqami formatda bo'lishi kerak: 99-999-99-99",
        "any.required": "Telefon raqami shart",
      }),
    admin_password: Joi.string().min(6).max(30).required().messages({
      "string.min": "Parol kamida 6 ta belgidan iborat bo'lishi kerak",
      "string.max": "Parol 30 belgidan oshmasligi kerak",
    }),

    admin_is_active: Joi.boolean().default(false),
    admin_is_creator: Joi.boolean().default(false),
  });

  return schema.validate(body, { abortEarly: false });
};
