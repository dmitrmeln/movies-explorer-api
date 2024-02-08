require('dotenv').config();

const express = require('express');
const cors = require('cors');

const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const appRouter = require('./routes');
const errorsHandler = require('./middlewares/error-handler');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const rateLimiter = require('./middlewares/rate-limiter');
const { PORT, MONGO_URL, NODE_ENV } = require('./utils/config');

mongoose.connect(NODE_ENV === 'production' ? MONGO_URL : 'mongodb://localhost:27017/bitfilmsdb')
  .then(() => {
    console.log('mongodb connected');
  });

// const whitelist = [
//   'http://localhost:3000',
//   'http://localhost:3001',
//   'http://moviesproject.nomoredomainsmonster.ru/',
//   'https://moviesproject.nomoredomainsmonster.ru/',
//   'http://api.moviesproject.nomoredomainsmonster.ru/',
//   'https://api.moviesproject.nomoredomainsmonster.ru/',
// ];

// // app.options('*', cors());

// const corsOptions = {
//   credentials: true,
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   },
// };

app.use(rateLimiter);
// app.use(cors(corsOptions));
app.use(cors());

app.use(express.json());
app.use(helmet());
app.use(requestLogger);
app.use(appRouter);
app.use(errorLogger);
app.use(errors());
app.use(errorsHandler);

app.listen(NODE_ENV === 'production' ? PORT : '3000', () => {
  console.log(`server started on port ${NODE_ENV === 'production' ? PORT : '3000'}`);
});
