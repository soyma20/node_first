const Joi = require("joi");



module.exports = {
    nameValidator: Joi.string().alphanum().min(2).max(20),
    emailValidator: Joi.string().lowercase(),
    ageValidator: Joi.number().integer().min(15).max(130),
    passwordValidator: Joi.string().required().min(5).max(25),
}
