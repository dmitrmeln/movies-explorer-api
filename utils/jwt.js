const jwt = require('jsonwebtoken');

const { JWT_SECRET, NODE_ENV } = require('./config');

const generateWebToken = (id) => jwt.sign({ id }, NODE_ENV === 'production' ? JWT_SECRET : 'secret', { expiresIn: '7d' });

const verifyWebToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'secret');

module.exports = {
  generateWebToken,
  verifyWebToken,
};
