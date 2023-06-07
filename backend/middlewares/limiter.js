const rateLimit = require('express-rate-limit');

module.exports.limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // максимум 15 минут
  max: 100, // Ограничение каждого IP до 100 запросов на `окно` (здесь, за 15 минут )
  standardHeaders: true, // Возвращаем информацию об ограничении скорости в заголовках
  legacyHeaders: false, // Отключаем заголовки `X-RateLimit-*`
});
