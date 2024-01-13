const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('./config');

const generateWebToken = (id) => jwt.sign({ id }, JWT_SECRET, { expiresIn: '7d' });

const verifyWebToken = (token) => jwt.verify(token, JWT_SECRET);

module.exports = {
  generateWebToken,
  verifyWebToken,
};
