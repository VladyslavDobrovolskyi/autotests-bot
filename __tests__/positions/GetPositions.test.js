import { app, request } from "../settings.js";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

describe("[GET] /positions", () => {
  test("Проверка ответа эндпоинта /positions", async () => {
    await allure.tags("Positions", "Validation");
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
        expect(response.statusCode).toBe(200);

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

      // Шаг 4: Проверка успешности запроса
      await allure.step("Проверка успешности запроса", async () => {
        expect(response.body.success).toBe(true);

        // Аттачмент после шага 4
        await allure.attachment(
          "Шаг 4: Успешность запроса",
          JSON.stringify({ success: response.body.success }),
          "application/json",
        );
      });

      // Шаг 5: Проверка данных позиций
      await allure.step("Проверка данных позиций", async () => {
        const positions = response.body.positions;
        expect(Array.isArray(positions)).toBe(true);

        positions.forEach((position) => {
          expect(position).toHaveProperty("id");
          expect(position).toHaveProperty("name");
        });

        // Аттачмент после шага 5
        await allure.attachment(
          "Шаг 5: Данные позиций",
          JSON.stringify(response.body.positions),
          "application/json",
        );
      });

      // Аттачмент тела ответа
      await allure.attachment(
        "Тело ответа",
        JSON.stringify(response.body),
        "application/json",
      );
    });
  });
});
