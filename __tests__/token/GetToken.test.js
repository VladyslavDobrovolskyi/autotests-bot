import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";
import { app, request, DOCUMENTATION } from "../settings.js"; // Изменено с require на import

describe("[GET] /token", () => {
  test("Возвращение валидного ответа с токеном", async () => {
    // Добавляем теги для категоризации теста
    await allure.tags("Authentication", "Token");
    await allure.label("feature", "Token");
    await allure.severity(Severity.CRITICAL); // Устанавливаем уровень серьезности

    // Добавляем ссылку на документацию
    await allure.link(
      `${DOCUMENTATION}/#/%D0%9F%D0%BE%D0%BB%D1%83%D1%87%D0%B5%D0%BD%D0%B8%D0%B5%20%D1%82%D0%BE%D0%BA%D0%B5%D0%BD%D0%B0/get_token`,
      'Раздел "Получение токена" в API документации.',
      "text/html",
    );

    // Шаги теста
    const response = await allure.step(
      "Отправка GET запроса на эндпоинт /token",
      async () => {
        return await request(app).get("/token");
      },
    );

    // Проверка статуса ответа
    await allure.step("Проверка статуса ответа на 200", async () => {
      expect(response.status).toBe(200);
      allure.attachment(
        "Response Status",
        `Полученный статус ответа: ${response.status}`,
        "text/plain",
      );
    });

    // Проверка заголовка 'Content-Type'
    await allure.step(
      "Проверка заголовка 'Content-Type', что он равен 'application/json'",
      async () => {
        expect(response.header["content-type"]).toContain("application/json");
        allure.attachment(
          "Content-Type Header",
          `Заголовок 'Content-Type': ${response.header["content-type"]}`,
          "text/plain",
        );
      },
    );

    // Проверка флага успеха в теле ответа
    await allure.step("Проверка флага успеха в теле ответа", async () => {
      expect(response.body.success).toBe(true);
      allure.attachment(
        "Response Body",
        JSON.stringify(response.body),
        "application/json",
      );
    });

    // Проверка, что токен определен и имеет ожидаемую длину
    await allure.step(
      "Проверка, что токен определен и имеет ожидаемую длину",
      async () => {
        expect(response.body.token).toBeDefined();
        expect(response.body.token.length).toBe(160);
        allure.attachment(
          "Token",
          `Полученный токен: ${response.body.token}`,
          "text/plain",
        );
      },
    );
  });
});
