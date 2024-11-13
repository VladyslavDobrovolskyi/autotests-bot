import * as allure from "allure-js-commons";
import { step } from "allure-js-commons";
import { Severity } from "allure-js-commons";
import { DOCUMENTATION } from "../settings.js"; // Изменено с require на import
import generateUserAndDoRequest from "../Functions/generateUserAndDoRequest.js";

describe("[POST] /users", () => {
  test("Запрос на регистрацию с истёкшим токеном.", async () => {
    await allure.tags("Authentication", "Token");
    await allure.label("feature", "Token");
    await allure.severity(Severity.NORMAL);
    await allure.link(
      `${DOCUMENTATION}/#/%D0%A0%D0%B5%D0%B3%D0%B8%D1%81%D1%82%D1%80%D0%B0%D1%86%D0%B8%D1%8F%20%D0%BF%D0%BE%D0%BB%D1%8C%D0%B7%D0%BE%D0%B2%D0%B0%D1%82%D0%B5%D0%BB%D1%8F/post_users`,
      'Раздел "Регистрация пользователя" в API документации.',
      "text/html",
    );

    const expiredToken =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXlsb2FkIjoxNjkyNTIwMDE5MDU2LCJpYXQiOjE2OTI1MjAwMTksImV4cCI6MTY5MjUyMjQxOX0.xR9nNhuDeS6ePNGdR3I9hDs6YkljEaIRyGugCpSZHWk";

    // Шаг 1: Отправка запроса с истекшим токеном
    const response = await step(
      "Отправка запроса с истекшим токеном",
      async () => {
        const response = await generateUserAndDoRequest({
          token: expiredToken,
        });
        await allure.attachment(
          "Отправка запроса с истекшим токеном",
          expiredToken,
          "text/plain",
        );
        return response;
      },
    );

    // Шаг 2: Проверка статуса ответа
    await step("Проверка статуса ответа", async () => {
      expect(response.status).toBe(401);
      await allure.attachment(
        "Статус ответа",
        `Полученный статус ответа: ${response.status}`,
        "text/plain",
      );
    });

    // Шаг 3: Проверка тела ответа
    await step("Проверка тела ответа", async () => {
      const expectedResponse = {
        success: false,
        message: "Token is expired.",
      };
      expect(response.body).toEqual(expectedResponse);

      await allure.attachment(
        "Тело ответа",
        JSON.stringify(response.body),
        "application/json",
      );
    });
  });
});
