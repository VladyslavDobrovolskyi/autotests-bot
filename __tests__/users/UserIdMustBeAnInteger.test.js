import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import { app, request } from "../settings.js";

describe("[GET] /users/:id", () => {
  test("Идентификатор пользователя должен быть целым числом", async () => {
    await allure.tags("User", "Validation");
    await allure.label("feature", "Users");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с некорректным значением ID
    const invalidUserId = "Invalid"; // Некорректный ID
    const response = await request(app).get(`/users/${invalidUserId}`);

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с некорректным идентификатором пользователя",
      `/users/${invalidUserId}`,
      "text/plain",
    );

    const expectedResponse = {
      success: false,
      fails: {
        user_id: ["The user id must be an integer."],
      },
      message: "Validation failed",
    };

    // Проверка статуса ответа
    expect(response.statusCode).toBe(400);
    await allure.attachment(
      "Статус ответа",
      `Статус ответа: ${response.statusCode}`,
      "text/plain",
    );

    // Проверка типа контента
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");
    await allure.attachment(
      "Тип контента",
      `Тип контента: ${contentType}`,
      "text/plain",
    );

    // Проверка тела ответа
    expect(response.body).toEqual(expectedResponse);
    await allure.attachment(
      "Тело ответа",
      JSON.stringify(response.body),
      "application/json",
    );

    // Дополнительный аттачмент с уточнением, что идентификатор должен быть целым числом
    allure.attachment(
      "Комментарий",
      "Идентификатор пользователя должен быть целым числом. Запрос с некорректным значением 'Invalid' не прошел валидацию.",
      "text/plain",
    );
  });
});
