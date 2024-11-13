import { app, request } from "../settings.js";
import * as allure from "allure-js-commons";
import { Severity } from "allure-js-commons";

describe("[GET] /users/?page= ", () => {
  test("Страница должна быть целым числом.", async () => {
    await allure.tags("Pagination", "Validation");
    await allure.label("feature", "Pagination");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса с параметром page = "Text"
    await allure.step(
      "Отправка запроса с некорректным значением page",
      async () => {
        const response = await request(app)
          .get(`/users`)
          .query({ page: "Text" });

        // Аттачмент после шага 1
        await allure.attachment(
          "Шаг 1: Отправка запроса с некорректным значением page",
          JSON.stringify({ page: "Text" }),
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
          expect(response.body.fails.page).toEqual([
            "The page must be an integer.",
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

  test("Страница должна быть не меньше 1.", async () => {
    await allure.tags("Pagination", "Validation");
    await allure.label("feature", "Pagination");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса с параметром page = 0
    await allure.step("Отправка запроса с page = 0", async () => {
      const response = await request(app).get(`/users`).query({ page: 0 });

      // Аттачмент после шага 1
      await allure.attachment(
        "Шаг 1: Отправка запроса с page = 0",
        JSON.stringify({ page: 0 }),
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
        expect(response.body.fails.page).toEqual([
          "The page must be at least 1.",
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

  test("Страница не найдена.", async () => {
    await allure.tags("Pagination", "Error");
    await allure.label("feature", "Pagination");
    await allure.severity(Severity.NORMAL);

    // Шаг 1: Отправка запроса с параметром page = 999
    await allure.step("Отправка запроса с page = 999", async () => {
      const response = await request(app).get(`/users`).query({ page: 999 });

      // Аттачмент после шага 1
      await allure.attachment(
        "Шаг 1: Отправка запроса с page = 999",
        JSON.stringify({ page: 999 }),
        "application/json",
      );

      // Шаг 2: Проверка статуса ответа
      await allure.step("Проверка статуса ответа", async () => {
        expect(response.statusCode).toBe(404);
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
        expect(response.body.message).toBe("Page not found");

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
