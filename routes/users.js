const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  updateUserInfo, readCurrentUser,
} = require('../controllers/users');

router.get('/me', readCurrentUser);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), updateUserInfo);

module.exports = router;