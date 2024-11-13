import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("При регистрации ключ position_id должен быть целочисленным", async () => {
    const requestData = { position_id: "Security" };

    // Добавляем теги и лейблы для Allure
    await allure.tags("User", "Validation");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с некорректным id должности
    const response = await generateUserAndDoRequest(requestData);

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        position_id: ["The position id must be an integer."],
      },
    };

    // Проверка ответа
    expect(response.status).toBe(422);
    expect(response.body).toEqual(expectedResponse);

    // Аттачмент с запросом
    allure.attachment(
      "Неверный формат position_id - Запрос",
      JSON.stringify(requestData),
      "application/json",
    );

    // Аттачмент со статусом ответа
    await allure.attachment(
      "Неверный формат position_id - Статус ответа",
      `Статус: ${response.status}`,
      "text/plain",
    );

    // Аттачмент с телом ответа
    await allure.attachment(
      "Неверный формат position_id - Тело ответа",
      JSON.stringify(response.body),
      "application/json",
    );

    // Аттачмент с типом контента
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");
    await allure.attachment(
      "Неверный формат position_id - Тип контента",
      `Тип контента: ${contentType}`,
      "text/plain",
    );
  });
});
