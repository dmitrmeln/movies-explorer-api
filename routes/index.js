const router = require('express').Router();
const cookieParser = require('cookie-parser');
const { celebrate, Joi } = require('celebrate');

const SearchError = require('../errors/search-error');

const usersRouter = require('./users');
const moviesRouter = require('./movies');
const { login, createUser, signOut } = require('../controllers/users');
const authMiddleware = require('../middlewares/auth');

const {
  errorMessages,
} = require('../utils/constants');

router.use(cookieParser());

router.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error(errorMessages.crashTest);
  }, 0);
});

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
    name: Joi.string().required().min(2).max(30),
  }),
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

router.use(authMiddleware);
router.use('/users', usersRouter);
router.use('/movies', moviesRouter);
router.post('/signout', signOut);

router.use('*', (req, res, next) => next(new SearchError(errorMessages.pageSearchError)));

module.exports = router;
