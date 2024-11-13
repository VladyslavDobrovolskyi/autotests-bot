import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

// Универсальная функция для добавления аттачментов
const addAllureAttachments = async (response, requestData, description) => {
  // Аттачмент с запросом
  allure.attachment(
    `${description} - Запрос`,
    JSON.stringify(requestData),
    "application/json",
  );

  // Статус ответа
  await allure.attachment(
    `${description} - Статус ответа`,
    `Статус: ${response.status}`,
    "text/plain",
  );

  // Тело ответа
  await allure.attachment(
    `${description} - Тело ответа`,
    JSON.stringify(response.body),
    "application/json",
  );

  // Тип контента
  const contentType = response.headers["content-type"];
  expect(contentType).toContain("application/json");
  await allure.attachment(
    `${description} - Тип контента`,
    `Тип контента: ${contentType}`,
    "text/plain",
  );
};

describe("[POST] /users", () => {
  test("Пользователь с таким (номером) телефона или почтой уже существует", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Conflict");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.CRITICAL); // Критическая ошибка

    // Отправка запроса с уже существующим телефоном
    const requestData = { phone: "+380900071441" };
    const response = await generateUserAndDoRequest(requestData);

    const expectedResponse = {
      success: false,
      message: "User with this phone or email already exist",
    };

    // Проверка ответа
    expect(response.status).toBe(409);
    expect(response.body).toEqual(expectedResponse);

    // Добавление аттачментов
    await addAllureAttachments(response, requestData, "Запрос с телефоном");
  });

  test("Пользователь с таким номером телефона или (почтой) уже существует", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Conflict");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.CRITICAL); // Критическая ошибка

    // Отправка запроса с уже существующим email
    const requestData = { email: "raymundo92@yahoo.com" };
    const response = await generateUserAndDoRequest(requestData);

    const expectedResponse = {
      success: false,
      message: "User with this phone or email already exist",
    };

    // Проверка ответа
    expect(response.status).toBe(409);
    expect(response.body).toEqual(expectedResponse);

    // Добавление аттачментов
    await addAllureAttachments(response, requestData, "Запрос с email");
  });
});
