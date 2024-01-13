const movieModel = require('../models/movie');
const SearchError = require('../errors/search-error');
const ForbiddenError = require('../errors/forbidden-error');

const {
  gotSuccess,
  successCreated,
} = require('../utils/constants');

function readAllMovies(req, res, next) {
  return movieModel
    .find()
    .then((movies) => res.status(gotSuccess.status).send(movies))
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
    .then((movie) => res.status(successCreated.status).send(movie))
    .catch(next);
}

function deleteMovie(req, res, next) {
  const { movieId } = req.params;
  const userId = req.user.id;

  return movieModel
    .findById(movieId)
    .orFail(new SearchError('Фильм с указанным _id не найден.'))
    .then((movie) => {
      if (movie.owner.toString() !== userId) {
        throw new ForbiddenError('У вас нет прав для удаления данного фильма.');
      }
      return movieModel.deleteOne(movie);
    })
    .then(() => res.status(gotSuccess.status).send({ message: 'Фильм успешно удалён.' }))
    .catch(next);
}

module.exports = {
  createMovie,
  deleteMovie,
  readAllMovies,
};
