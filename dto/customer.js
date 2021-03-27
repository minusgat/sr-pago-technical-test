const joi = require('@hapi/joi');

/**DTO
 *
 *Data Transport Object
 *
 **/

const createCustomerSchema = joi.object({
  email: joi.string().email().required(),
  password: joi.string().required(),
  username: joi.string().required(),
  city: joi.string().min(3).required(),
})

const authCustomerSchema = joi.object({
  username: joi.string().required(),
  password: joi.string().required(),
})

module.exports = {
  createCustomerSchema,
  authCustomerSchema
};
