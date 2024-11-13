import { faker } from "@faker-js/faker";
import axios from "axios";
import request from "supertest";
import { app } from "../settings.js";

async function generateUserAndDoRequest({
  token = "Generate",
  name = "Fake",
  email = "Fake",
  phone = "Fake",
  position_id = "Fake",
  photo = "Fake",
  imageWidth,
  imageHeight,
  imageFormat,
} = {}) {
  const userName = name === "Fake" ? faker.person.firstName() : name;
  const userEmail =
    email === "Fake" ? faker.internet.email().toLowerCase() : email;
  const userPhone =
    phone === "Fake" ? faker.helpers.fromRegExp("+380[73 99][1-9]{7}") : phone;
  const userPosition_id =
    position_id === "Fake" ? Math.floor(Math.random() * 4) + 1 : position_id;

  const userPhoto =
    photo === "Fake"
      ? faker.image.urlLoremFlickr({
          width: imageWidth || 70,
          height: imageHeight || 70,
          category: "abstract",
        })
      : photo;

  const data = {
    userName,
    userEmail,
    userPhone,
    userPosition_id,
    userPhoto,
  };

  const tokenResponse = await request(app).get("/token");
  const userToken = token === "Generate" ? tokenResponse.body.token : token;

  let photoStream;

  // Проверяем, нужно ли загружать фото
  if (userPhoto) {
    const response = await axios.get(data.userPhoto, {
      responseType: "arraybuffer",
    });
    photoStream = Buffer.from(response.data);
  }

  const requestBody = request(app)
    .post("/users")
    .set("Token", userToken)
    .field("name", data.userName)
    .field("email", data.userEmail)
    .field("phone", data.userPhone)
    .field("position_id", data.userPosition_id);

  // Если photoStream не null, прикрепляем фото
  if (photoStream) {
    requestBody.attach("photo", photoStream, {
      filename: `photo.${imageFormat || "jpg"}`,
    });
  }

  const response = await requestBody;
  return response;
}

export default generateUserAndDoRequest;
