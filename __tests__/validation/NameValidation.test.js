import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("Имя должно быть не менее 2 символов.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с коротким именем
    const shortName = "W";
    const response = await generateUserAndDoRequest({ name: shortName });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с именем 'W'",
      JSON.stringify({ name: shortName }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        name: ["The name must be at least 2 characters."],
      },
    };

    // Проверка ответа
    expect(response.status).toBe(422);
    await allure.attachment(
      "Статус ответа",
      `Статус: ${response.status}`,
      "text/plain",
    );

    expect(response.body).toEqual(expectedResponse);
    await allure.attachment(
      "Тело ответа",
      JSON.stringify(response.body),
      "application/json",
    );

    // Проверка контента ответа
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");
    await allure.attachment(
      "Тип контента",
      `Тип контента: ${contentType}`,
      "text/plain",
    );

    // Пояснение: Имя слишком короткое
    allure.attachment(
      "Пояснение ошибки",
      `Имя '${shortName}' слишком короткое, минимальная длина: 2 символа.`,
      "text/plain",
    );
  });

  test("Имя не должно превышать 60 символов.", async () => {
    // Отправка запроса с длинным именем
    await allure.tags("User", "Validation");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);
    const longName = `'A'${"a".repeat(60)}`;
    const response = await generateUserAndDoRequest({ name: longName });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с длинным именем",
      JSON.stringify({ name: longName }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        name: ["The name must not exceed 60 characters."],
      },
    };

    // Проверка ответа
    expect(response.status).toBe(422);
    await allure.attachment(
      "Статус ответа",
      `Статус: ${response.status}`,
      "text/plain",
    );

    expect(response.body).toEqual(expectedResponse);
    await allure.attachment(
      "Тело ответа",
      JSON.stringify(response.body),
      "application/json",
    );

    // Проверка контента ответа
    const contentType = response.headers["content-type"];
    expect(contentType).toContain("application/json");
    await allure.attachment(
      "Тип контента",
      `Тип контента: ${contentType}`,
      "text/plain",
    );

    // Пояснение: Имя слишком длинное
    allure.attachment(
      "Пояснение ошибки",
      `Имя '${longName}' слишком длинное, максимальная длина: 60 символов.`,
      "text/plain",
    );
  });
});
