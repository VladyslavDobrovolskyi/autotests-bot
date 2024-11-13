import { app, request, userRange } from "../settings.js";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

describe("[GET] /users/:id", () => {
  test("Проверка ответа от эндпоинта /users/:id", async () => {
    await allure.tags("User", "Fetch");
    await allure.label("feature", "Users");
    await allure.severity(Severity.NORMAL);

    const userId = Math.floor(Math.random() * userRange) + 1;

    // Шаг 1: Отправка запроса на получение пользователя
    const response = await request(app).get(`/users/${userId}`);

    // Прикрепляем информацию о запросе
    await allure.attachment(
      "Запрос на получение пользователя",
      `URL: /users/${userId}`,
      "text/plain",
    );

    // Шаг 2: Проверка статуса ответа
    expect(response.status).toBe(200);

    // Шаг 3: Проверка заголовка Content-Type
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");

    // Шаг 4: Проверка флага успеха в теле ответа
    expect(response.body.success).toBe(true);

    // Шаг 5: Проверка свойств пользователя
    const user = response.body.user;
    expect(user).toHaveProperty("id");
    expect(user).toHaveProperty("name");
    expect(user).toHaveProperty("email");
    expect(user).toHaveProperty("phone");
    expect(user).toHaveProperty("position_id");
    expect(user).toHaveProperty("position");
    expect(user).toHaveProperty("photo");

    // Шаг 6: Прикрепляем тело ответа для Allure
    await allure.attachment(
      "Тело ответа",
      JSON.stringify(response.body),
      "application/json",
    );
  });
});
