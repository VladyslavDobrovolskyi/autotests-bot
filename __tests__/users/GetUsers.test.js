import { app, request } from "../settings.js";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

describe("[GET] /users", () => {
  test("Проверка ответа от эндпоинта /users", async () => {
    await allure.tags("User", "Fetch");
    await allure.label("feature", "Users");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса на получение списка пользователей
    const response = await request(app).get("/users");

    // Прикрепляем информацию о запросе
    allure.attachment(
      "Запрос на получение списка пользователей",
      "/users",
      "text/plain",
    );

    // Шаг 2: Проверка статуса ответа
    expect(response.status).toBe(200);

    // Шаг 3: Проверка заголовка Content-Type
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");

    // Шаг 4: Проверка флага успеха в теле ответа
    expect(response.body.success).toBe(true);

    // Шаг 5: Проверка, что полученные данные - это массив пользователей
    const users = response.body.users;
    expect(Array.isArray(users)).toBe(true);

    // Шаг 6: Проверка свойств каждого пользователя
    users.forEach((user) => {
      expect(user).toHaveProperty("id");
      expect(user).toHaveProperty("name");
      expect(user).toHaveProperty("email");
      expect(user).toHaveProperty("phone");
      expect(user).toHaveProperty("position_id");
      expect(user).toHaveProperty("position");
      expect(user).toHaveProperty("photo");
    });

    // Шаг 7: Прикрепляем тело ответа для Allure
    allure.attachment(
      "Тело ответа",
      JSON.stringify(response.body),
      "application/json",
    );
  });
});
