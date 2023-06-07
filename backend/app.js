require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { celebrate, Joi } = require('celebrate');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('./middlewares/cors');
const limiter = require('./middlewares/limiter');

const { regexUrl } = require('./utils/regularExpression');

const NotFoundError = require('./errors/NotFoundError');

const {
  createUser,
  login,
} = require('./controllers/users');

const auth = require('./middlewares/auth');

const router = require('./routes/index');

const app = express();

// const PORT = process.env.PORT || 3001;
// const { BD } = process.env || 'mongodb://127.0.0.1:27017/mestodb';

const {
  PORT = 3000,
  BD = 'mongodb://127.0.0.1:27017/mestodb',
} = process.env;

mongoose.connect(BD)
  .then(() => {
    console.log('БД подключена');
  })
  .catch(() => {
    console.log('Не удалось подключиться к БД');
  });

app.use(bodyParser.json());

app.use(requestLogger);

app.use(helmet());

app.use(cors);

app.use(limiter);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

// роуты, не требующие авторизации
app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(regexUrl),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

// авторизация
app.use(auth);

app.use(router);

app.use('/*', (req, res, next) => next(new NotFoundError('Страница не найдена.')));

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  // если у ошибки нет статуса, выставляем 500
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      // проверяем статус и выставляем сообщение в зависимости от него
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

app.listen(PORT, () => console.log(`Web app available at http://127.0.0.1:${PORT}`));
