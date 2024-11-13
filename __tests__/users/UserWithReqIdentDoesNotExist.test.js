import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import { app, request } from "../settings.js";

describe("[GET] /users/:id", () => {
  test("Пользователь с запрашиваемым идентификатором не существует", async () => {
    // Теги для категоризации теста
    await allure.tags("User", "Validation");
    await allure.label("feature", "Users");
    await allure.severity(Severity.NORMAL);

    const nonExistentUserId = 0; // Идентификатор, который точно не существует в базе

    // Отправка запроса с несуществующим идентификатором
    const response = await request(app).get(`/users/${nonExistentUserId}`);

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с несуществующим идентификатором пользователя",
      `/users/${nonExistentUserId}`,
      "text/plain",
    );

    // Ожидаемый ответ
    const expectedResponse = {
      success: false,
      fails: {
        user_id: ["User not found."],
      },
      message: "The user with the requested identifier does not exist.",
    };

    // Проверка статуса ответа
    expect(response.statusCode).toBe(404);
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

    // Дополнительный комментарий о причине неудачи
    allure.attachment(
      "Комментарий",
      `Запрос с идентификатором ${nonExistentUserId} не вернул пользователя. Ожидаемый ответ: "User not found."`,
      "text/plain",
    );
  });
});
