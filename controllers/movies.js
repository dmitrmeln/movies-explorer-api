const movieModel = require('../models/movie');
const SearchError = require('../errors/search-error');
const ForbiddenError = require('../errors/forbidden-error');

const {
  errorMessages,
  successMessages,
  statusCodes,
} = require('../utils/constants');

function readAllMovies(req, res, next) {
  const ownerId = req.user.id;
  return movieModel
    .find({ owner: ownerId })
    .then((movies) => res.status(statusCodes.gotSuccess).send(movies))
    .catch(next);
}

function createMovie(req, res, next) {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    thumbnail,
    movieId,
    nameRU,
    nameEN,
  } = req.body;

  return movieModel
    .create({
      country,
      director,
      duration,
      year,
      description,
      image,
      trailerLink,
      thumbnail,
      movieId,
      nameRU,
      nameEN,
      owner: req.user.id,
    })
    .then((movie) => res.status(statusCodes.successCreated).send(movie))
    .catch(next);
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user.id;

  return movieModel
    .findById(movieId)
    .orFail(new SearchError(errorMessages.movieSearchError))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError(errorMessages.forbiddenError);
      }
      return movieModel.deleteOne(movie);
    })
    .then(() => res.status(statusCodes.gotSuccess).send({ message: successMessages.movieCreated }))
    .catch(next);
}

module.exports = {
  createMovie,
  deleteMovie,
  readAllMovies,
};
