const { Telegraf } = require("telegraf");
const { exec } = require("child_process");
const dotenv = require("dotenv");

// Загружаем переменные окружения из файла .env
dotenv.config();
console.log(process.env.BOT_TOKEN);
// Используем переменную BOT_TOKEN из .env
const bot = new Telegraf(process.env.BOT_TOKEN);

// Обработчик команды /start для приветствия
bot.start((ctx) => {
  ctx.reply(
    "Привет! Я бот, который поможет вам запустить тесты. Просто напишите /start_tests чтобы начать.",
  );
});

// Обработчик команды /start_tests для запуска тестов
bot.command("start_tests", (ctx) => {
  const chatId = ctx.chat.id;

  // Отправляем сообщение о начале тестирования
  ctx.reply("Запускаю тесты, подождите немного...");

  // Выполняем команду для запуска тестов (например, npm test)
  exec("npm test", (error, stdout, stderr) => {
    if (error) {
      ctx.reply(`Ошибка при запуске тестов: ${error.message}`);
      return;
    }
    if (stderr) {
      ctx.reply(`Отчёт Jest:
${stderr}`);
      ctx.reply(`Отчёт Allure: https://report.api.vladyslavdobrovolskyi.tech`);
      return;
    }

    // Отправляем отчет о тестах
    ctx.reply(`Тесты успешно завершены:\n${stdout}`);
  });
});

// Запускаем бота
bot.launch().then(() => {
  console.log("Бот запущен");
});
