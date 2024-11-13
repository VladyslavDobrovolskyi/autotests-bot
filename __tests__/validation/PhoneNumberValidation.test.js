import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("Номер телефона должен начинаться с кода Украины (+380).", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с неправильным номером телефона
    const phoneNumber = "+385731828194";
    const response = await generateUserAndDoRequest({ phone: phoneNumber });

    // Аттачмент с запросом
    allure.attachment(
      `Запрос с номером телефона '${phoneNumber}'`,
      JSON.stringify({ phone: phoneNumber }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        phone: [
          "The phone number should start with the code of Ukraine (+380).",
        ],
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

    // Пояснение: Неверный код страны
    allure.attachment(
      "Пояснение ошибки",
      `Номер телефона '${phoneNumber}' должен начинаться с кода Украины (+380).`,
      "text/plain",
    );
  });

  test("Номер телефона обязателен.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с пустым номером телефона
    const response = await generateUserAndDoRequest({ phone: "" });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с пустым номером телефона",
      JSON.stringify({ phone: "" }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        phone: ["The phone number is required."],
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

    // Пояснение: Номер телефона обязателен
    allure.attachment(
      "Пояснение ошибки",
      `Номер телефона обязателен.`,
      "text/plain",
    );
  });
});
