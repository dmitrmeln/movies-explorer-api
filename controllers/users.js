const validator = require('validator');
const bcrypt = require('bcrypt');
const userModel = require('../models/user');

const { generateWebToken } = require('../utils/jwt');
const SearchError = require('../errors/search-error');
const BadRequestError = require('../errors/bad-request-error');
const RegistrationError = require('../errors/registration-error');
const ServerError = require('../errors/server-error');
const UnauthorizedError = require('../errors/unauthorized-error');

const { SALT_ROUNDS, NODE_ENV } = require('../utils/config');

const {
  errorMessages,
  successMessages,
  statusCodes,
} = require('../utils/constants');

function handleUserUpdate(req, res, next, options) {
  return userModel
    .findByIdAndUpdate(
      req.user.id,
      options,
      {
        new: true,
        runValidators: true,
      },
    )
    .orFail(new SearchError(errorMessages.userSearchError))
    .then((user) => res.status(statusCodes.gotSuccess).send(user))
    .catch((error) => {
      if (error.name === 'MongoServerError' && error.code === statusCodes.dublicateKey) {
        return next(new RegistrationError(errorMessages.registrationError));
      }
      return next(error);
    });
}

function updateUserInfo(req, res, next) {
  const updateData = { name: req.body.name, email: req.body.email };

  return handleUserUpdate(req, res, next, updateData);
}

function readCurrentUser(req, res, next) {
  const { id } = req.user;

  return userModel
    .findOne({ _id: id })
    .orFail(new SearchError(errorMessages.userSearchError))
    .then((user) => res.status(statusCodes.gotSuccess).send({ email: user.email, name: user.name }))
    .catch(next);
}

function login(req, res, next) {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new BadRequestError(errorMessages.loginRequestError));
  }

  return userModel
    .findOne({ email }).select('+password')
    .orFail(new UnauthorizedError(errorMessages.authRequestError))
    .then((user) => {
      const token = generateWebToken(user._id);

      return bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          throw err;
        }
        if (!isMatch) {
          return next(new UnauthorizedError(errorMessages.authRequestError));
        }

        return res
          .status(statusCodes.gotSuccess)
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: 'false',
          })
          .send({ token });
      });
    })
    .catch(next);
}

function signOut(req, res, next) {
  const { jwt: token } = req.cookies;

  if (!token) {
    return next(new UnauthorizedError(errorMessages.unauthorizedError));
  }

  res.clearCookie('jwt');
  return res.status(statusCodes.gotSuccess).send({ message: successMessages.signOut });
}

function createUser(req, res, next) {
  const {
    email, password, name,
  } = req.body;

  if (!email || !password || !name) {
    return next(new BadRequestError(errorMessages.registrationRequestError));
  }

  if (!validator.isEmail(email)) {
    return next(new BadRequestError(errorMessages.emailError));
  }

  return bcrypt.hash(password, NODE_ENV === 'production' ? SALT_ROUNDS : '10', (err, hash) => {
    if (err) {
      next(new ServerError(errorMessages.serverError));
    }

    return userModel.create({
      email, password: hash, name,
    })
      .then((user) => res.status(statusCodes.successCreated).send({
        email: user.email,
        name: user.name,
      }))
      .catch((error) => {
        if (error.name === 'MongoServerError' && error.code === 11000) {
          return next(new RegistrationError(errorMessages.registrationError));
        }
        return next(error);
      });
  });
}

module.exports = {
  createUser,
  updateUserInfo,
  login,
  readCurrentUser,
  signOut,
};
