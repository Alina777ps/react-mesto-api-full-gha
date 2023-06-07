const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
  max: 100,
  windowMS: 55000,
  message: 'Превышено количество запросов на сервер.',
});

module.exports = limiter;
