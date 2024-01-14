const { verifyWebToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

const { errorMessages } = require('../utils/constants');

function auth(req, res, next) {
  const token = req.cookies.jwt;

  if (!token) {
    return next(new UnauthorizedError(errorMessages.unauthorizedError));
  }

  let payload;

  try {
    payload = verifyWebToken(token);
  } catch (err) {
    return next(new UnauthorizedError(errorMessages.unauthorizedError));
  }

  req.user = payload;
  return next();
}

module.exports = auth;
