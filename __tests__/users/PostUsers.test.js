import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("Проверка ответа от эндпоинта /users при успешной регистрации", async () => {
    await allure.tags("User", "Registration");
    await allure.label("feature", "Users");
    await allure.severity(Severity.BLOCKER);

    // Шаг 1: Генерация пользователя и отправка запроса
    const response = await generateUserAndDoRequest();

    // Добавление аттачмента с запросом для Allure
    allure.attachment(
      "Запрос на регистрацию нового пользователя",
      JSON.stringify(response.request),
      "application/json",
    );

    // Шаг 2: Проверка статуса ответа на 201 (создано)
    expect(response.status).toBe(201);
    await allure.attachment(
      "Статус ответа",
      `Статус ответа: ${response.status}`,
      "text/plain",
    );

    // Шаг 3: Проверка заголовка Content-Type
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");
    await allure.attachment(
      "Тип контента",
      `Тип контента: ${contentType}`,
      "text/plain",
    );

    // Шаг 4: Проверка успешности ответа
    expect(response.body.success).toBe(true);
    await allure.attachment(
      "Успешный ответ",
      `Ответ: ${JSON.stringify(response.body)}`,
      "application/json",
    );

    // Шаг 5: Проверка наличия свойств в теле ответа
    expect(response.body).toHaveProperty("user_id");
    expect(response.body).toHaveProperty(
      "message",
      "New user successfully registered",
    );
    await allure.attachment(
      "Проверка данных пользователя",
      `user_id: ${response.body.user_id}, message: ${response.body.message}`,
      "text/plain",
    );
  });
});
