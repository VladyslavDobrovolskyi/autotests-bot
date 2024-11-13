import { app, request } from "../settings.js";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

describe("[GET] /positions", () => {
  xtest('Возвращение ответа "Page not found."', async () => {
    await allure.tags("Positions", "PageNotFound");
    await allure.label("feature", "Positions");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса к эндпоинту /positions
    await allure.step("Отправка запроса к эндпоинту /positions", async () => {
      const response = await request(app).get("/positions");

      // Аттачмент после шага 1
      await allure.attachment(
        "Шаг 1: Отправка запроса",
        JSON.stringify({ endpoint: "/positions" }),
        "application/json",
      );

      // Шаг 2: Проверка статуса ответа
      await allure.step("Проверка статуса ответа", async () => {
        expect(response.statusCode).toBe(404);

        // Аттачмент после шага 2
        await allure.attachment(
          "Шаг 2: Статус ответа",
          JSON.stringify({ statusCode: response.statusCode }),
          "application/json",
        );
      });

      // Шаг 3: Проверка типа контента
      await allure.step("Проверка типа контента", async () => {
        const contentType = response.headers["content-type"];
        expect(contentType).toContain("application/json");

        // Аттачмент после шага 3
        await allure.attachment(
          "Шаг 3: Тип контента",
          JSON.stringify({ contentType }),
          "application/json",
        );
      });

      // Шаг 4: Проверка тела ответа
      await allure.step("Проверка тела ответа", async () => {
        const expectedResponse = {
          success: false,
          message: "Page not found.",
        };

        expect(response.body).toEqual(expectedResponse);

        // Аттачмент после шага 4
        await allure.attachment(
          "Шаг 4: Тело ответа",
          JSON.stringify(response.body),
          "application/json",
        );
      });

      // Аттачмент итогового ответа
      await allure.attachment(
        "Итоговое тело ответа",
        JSON.stringify(response.body),
        "application/json",
      );
    });
  });
});
