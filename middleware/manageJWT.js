const ApiError = require('../error/api-error');
const {jwt} = require('../util/jwt');

function createJWT(payloadData) {
  return async (req, res, next) => {
    try {
      req.body = await jwt.create(payloadData);
      next();
    } catch (error) {
      next(ApiError.internal(error));
    }
  };
}

function validateJWT() {
  return async (req, res, next) => {

    try {
      let headers = req.headers['x-access-token'] || req.headers['authorization'];

      if (headers) {
        const token = headers.replace(/^Bearer\s+/, '');
        if (token) {
          const verifiedToken = await jwt.verify(token)
          if (verifiedToken)
            next()
        } else
          next(ApiError.badRequest(`It's look like you didn't provide a valid or active Token`));
      } else next(ApiError.badRequest(`It's look like you didn't provide a Bearer Authorization`))
    } catch (error) {
      next(ApiError.unauthorized(error))
    }
  }
}

module.exports = {
  createJWT,
  validateJWT
};
