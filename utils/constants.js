const gotSuccess = {
  status: 200,
};

const successCreated = {
  status: 201,
};

const statusCodes = {
  gotSuccess: 200,
  successCreated: 201,
  dublicateKey: 11000,
  dataError: 400,
};

const errorMessages = {
  registrationError: 'Пользователь с данным email уже существует.',
  forbiddenError: 'У вас нет прав для удаления данного фильма.',
  linkValidationError: 'Некорректная ссылка.',
  pageSearchError: 'Страница не найдена',
  movieSearchError: 'Фильм с указанным _id не найден.',
  userSearchError: 'Пользователь с указанным _id не найден.',
  serverError: 'Ошибка сервера.',
  emailError: 'Некорректный email.',
  linkError: 'Некорректная ссылка.',
  registrationRequestError: 'Требуется заполнить имя, email и пароль.',
  loginRequestError: 'Требуется заполнить email и пароль.',
  unauthorizedError: 'Необходима авторизация.',
  authRequestError: 'Неправильный email или пароль.',
  crashTest: 'Сервер сейчас упадёт',
  dataError: 'Переданы некорректные данные.',
};

const successMessages = {
  movieCreated: 'Фильм успешно удалён.',
  signOut: 'Вы успешно вышли',
};

const urlRegex = /^(https?:\/\/)?([a-zA-Z0-9.-]+(\.[a-zA-Z]{2,})+)(\/[a-zA-Z0-9-._~:/?#[\]@!$&'()*+,;=]*)?$/;

module.exports = {
  gotSuccess,
  successCreated,
  urlRegex,
  errorMessages,
  successMessages,
  statusCodes,
};
