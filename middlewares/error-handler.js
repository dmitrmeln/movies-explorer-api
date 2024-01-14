const mongoose = require('mongoose');
const ServerError = require('../errors/server-error');

const {
  errorMessages,
  statusCodes,
} = require('../utils/constants');

const errorsHandler = (err, req, res, next) => {
  console.log(err);
  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  if (err instanceof mongoose.Error.CastError || err instanceof mongoose.Error.ValidationError) {
    return res.status(statusCodes.dataError).send({ message: errorMessages.dataError });
  }

  return res.status(ServerError.statusCode).send({ message: errorMessages.serverError });
};

module.exports = errorsHandler;
