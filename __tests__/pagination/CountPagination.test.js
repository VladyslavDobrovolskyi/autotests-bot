import { app, request } from "../settings.js";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

describe("[GET] /users/?count=", () => {
  test("Количество должно быть целым числом.", async () => {
    // Тегирование и метки
    await allure.tags("Pagination", "Validation");
    await allure.label("feature", "Pagination");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса с параметром count = "Text"
    await allure.step(
      "Отправка запроса с некорректным значением count",
      async () => {
        const response = await request(app)
          .get(`/users`)
          .query({ count: "Text" });

        // Аттачмент после шага 1
        await allure.attachment(
          "Шаг 1: Отправка запроса с некорректным значением count",
          JSON.stringify({ count: "Text" }),
          "application/json",
        );

        // Шаг 2: Проверка статуса ответа
        await allure.step("Проверка статуса ответа", async () => {
          expect(response.statusCode).toBe(422);
          expect(response.body.success).toBe(false);

          // Аттачмент после шага 2
          await allure.attachment(
            "Шаг 2: Статус ответа",
            JSON.stringify({
              statusCode: response.statusCode,
              success: response.body.success,
            }),
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
          expect(response.body.users).toBeUndefined();
          expect(response.body).toHaveProperty("message");
          expect(response.body.message).toBe("Validation failed");
          expect(response.body.fails.count).toEqual([
            "The count must be an integer.",
          ]);

          // Аттачмент после шага 4
          await allure.attachment(
            "Шаг 4: Тело ответа",
            JSON.stringify(response.body),
            "application/json",
          );
        });
      },
    );
  });

  test("Количество должно быть не меньше 1.", async () => {
    // Тегирование и метки
    await allure.tags("Pagination", "Validation");
    await allure.label("feature", "Pagination");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса с параметром count = 0
    await allure.step("Отправка запроса с count = 0", async () => {
      const response = await request(app).get(`/users`).query({ count: 0 });

      // Аттачмент после шага 1
      await allure.attachment(
        "Шаг 1: Отправка запроса с count = 0",
        JSON.stringify({ count: 0 }),
        "application/json",
      );

      // Шаг 2: Проверка статуса ответа
      await allure.step("Проверка статуса ответа", async () => {
        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);

        // Аттачмент после шага 2
        await allure.attachment(
          "Шаг 2: Статус ответа",
          JSON.stringify({
            statusCode: response.statusCode,
            success: response.body.success,
          }),
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
        expect(response.body.users).toBeUndefined();
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Validation failed");
        expect(response.body.fails.count).toEqual([
          "The count must be at least 1.",
        ]);

        // Аттачмент после шага 4
        await allure.attachment(
          "Шаг 4: Тело ответа",
          JSON.stringify(response.body),
          "application/json",
        );
      });
    });
  });

  test("Количество не может быть больше 100.", async () => {
    // Тегирование и метки
    await allure.tags("Pagination", "Validation");
    await allure.label("feature", "Pagination");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса с параметром count = 101
    await allure.step("Отправка запроса с count = 101", async () => {
      const response = await request(app).get(`/users`).query({ count: 101 });

      // Аттачмент после шага 1
      await allure.attachment(
        "Шаг 1: Отправка запроса с count = 101",
        JSON.stringify({ count: 101 }),
        "application/json",
      );

      // Шаг 2: Проверка статуса ответа
      await allure.step("Проверка статуса ответа", async () => {
        expect(response.statusCode).toBe(422);
        expect(response.body.success).toBe(false);

        // Аттачмент после шага 2
        await allure.attachment(
          "Шаг 2: Статус ответа",
          JSON.stringify({
            statusCode: response.statusCode,
            success: response.body.success,
          }),
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
        expect(response.body.users).toBeUndefined();
        expect(response.body).toHaveProperty("message");
        expect(response.body.message).toBe("Validation failed");
        expect(response.body.fails.count).toEqual([
          "The count may not be greater than 100.",
        ]);

        // Аттачмент после шага 4
        await allure.attachment(
          "Шаг 4: Тело ответа",
          JSON.stringify(response.body),
          "application/json",
        );
      });
    });
  });
});
