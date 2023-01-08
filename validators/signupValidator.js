const Joi = require('joi')

const schema = Joi.object({
    name: Joi
        .string()
        .min(2)
        .required(),
    email: Joi
        .string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ['com', 'net'] }
        }),
    password: Joi
        .string()
        .min(6)
        .required(),
    refreshToken: Joi
        .string()
        .min(0)
        .optional()
})

module.exports = async function validateUser(doc) {
    return await schema.validateAsync(doc)
}