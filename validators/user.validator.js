const Joi = require('joi')

module.exports = {
    newUserValidator: Joi.object({
        name: Joi.string().alphanum().min(2).max(20).required(),
        email: Joi.string().required(),
        age: Joi.number().integer().min(15).max(130),
        password: Joi.string().required().min(5).max(25)
    })

}
