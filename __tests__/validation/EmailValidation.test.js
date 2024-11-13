import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("Электронная почта должна быть действительным адресом электронной почты в соответствии с RFC2822", async () => {
    // Добавление тегов для категоризации теста
    await allure.tags("User", "Validation");
    await allure.label("feature", "User Registration");
    await allure.severity(Severity.NORMAL);

    const invalidEmail = "test@mail"; // Неверный email для теста

    // Отправка запроса с недействительным email
    const response = await generateUserAndDoRequest({ email: invalidEmail });

    // Аттачмент с запросом
    allure.attachment(
      "Запрос с неверным email",
      JSON.stringify({ email: invalidEmail }),
      "application/json",
    );

    // Ожидаемый ответ
    const expectedResponse = {
      success: false,
      message: "Validation failed",
      fails: {
        email: [
          "The email must be a valid email address according to RFC2822.",
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

    // Проверка тела ответа
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

    // Дополнительный аттачмент с пояснением, почему email не прошел валидацию
    allure.attachment(
      "Пояснение ошибки",
      `Email '${invalidEmail}' не прошел валидацию. Ожидаемый формат: соответствующий RFC2822.`,
      "text/plain",
    );
  });
});
