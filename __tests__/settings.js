import { HOST as app, DOCUMENTATION } from "../config.js";
import supertest from "supertest";

const userRange = 2;
const request = supertest;

export { app, DOCUMENTATION, request, userRange };
