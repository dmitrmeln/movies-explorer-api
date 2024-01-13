const { verifyWebToken } = require('../utils/jwt');
const UnauthorizedError = require('../errors/unauthorized-error');

function auth(req, res, next) {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = verifyWebToken(token);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация.'));
  }

  req.user = payload;
  return next();
}

module.exports = auth;
