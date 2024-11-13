import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("Фото обязательно.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Photo");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с пустым фото
    const response = await generateUserAndDoRequest({ photo: "" });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с пустым фото",
      JSON.stringify({ photo: "" }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        photo: ["The photo is required."],
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
  });

  xtest("Фото должно быть в формате JPG/JPEG.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Photo", "Format");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с фото в формате PNG
    const response = await generateUserAndDoRequest({ imageFormat: "png" });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с фото формата PNG",
      JSON.stringify({ imageFormat: "png" }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        photo: ["The photo should be in JPG/JPEG format."],
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
  });

  test("Размеры фото должны быть 70x70 пикселей.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Photo", "Size");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с неверными размерами фото
    const response = await generateUserAndDoRequest({
      imageWidth: 95,
      imageHeight: 95,
    });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с размерами фото 95x95",
      JSON.stringify({ imageWidth: 95, imageHeight: 95 }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        photo: ["The photo dimensions must be 70x70 pixels."],
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
  });

  xtest("Неверный формат изображения.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Photo", "Format");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с изображением формата GIF
    const response = await generateUserAndDoRequest({ imageFormat: "gif" });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с фото формата GIF",
      JSON.stringify({ imageFormat: "gif" }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        photo: ["Invalid image format."],
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
  });

  xtest("Размер фото не должен превышать 5 МБ.", async () => {
    // Добавляем теги и метки для Allure
    await allure.tags("User", "Validation", "Photo", "Size");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    // Отправка запроса с изображением, превышающим 5 МБ
    const response = await generateUserAndDoRequest({
      imageWidth: 2456,
      imageHeight: 1336,
    });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с фото размером больше 5 МБ",
      JSON.stringify({ imageWidth: 2456, imageHeight: 1336 }),
      "application/json",
    );

    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        photo: ["The photo size must not exceed 5MB."],
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
  });
});
