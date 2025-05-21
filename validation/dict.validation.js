const Joi = require("joi");
const { schema } = require("../schemas/Dict");

exports.dictValidation=(body)=>{
    const Schema = Joi.object({
      term: Joi.string()
        .min(2)
        .message("IT Termin 1 ta harfdan kam bo'lmasligi kerak")
        .required()
        .messages({
          "string.empty": "Dictionary bo'sh bo'lishi mumkin emas",
          "any.required": "Dictionary albatta kiritilishi kerak",
        }),
    });
    return schema.validate(body) // error yoki value

}