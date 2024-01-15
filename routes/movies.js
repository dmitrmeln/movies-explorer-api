const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const movieController = require('../controllers/movies');
const { urlRegex } = require('../utils/constants');

router.get('/', movieController.readAllMovies);

router.post('/', celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.string().regex(/^\d+$/).required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(urlRegex),
    trailerLink: Joi.string().required().regex(urlRegex),
    thumbnail: Joi.string().required().regex(urlRegex),
    movieId: Joi.string().regex(/^\d+$/).required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
}), movieController.createMovie);

router.delete('/:movieId', celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24),
  }),
}), movieController.deleteMovie);

module.exports = router;
