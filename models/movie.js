const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
  },
  director: {
    type: String,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const linkRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return linkRegex.test(value);
      },
      message: 'Некорректная ссылка.',
    },
  },
  trailerLink: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const linkRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return linkRegex.test(value);
      },
      message: 'Некорректная ссылка.',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        const linkRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;
        return linkRegex.test(value);
      },
      message: 'Некорректная ссылка.',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
  },
  nameEN: {
    type: String,
    required: true,
  },
}, {
  versionKey: false,
});

module.exports = mongoose.model('movie', movieSchema);
