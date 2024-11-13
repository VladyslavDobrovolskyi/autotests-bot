import dotenv from "dotenv";
dotenv.config();

const HOST = process.env.API_HOST || "http://localhost:3000";
const DOCUMENTATION = process.env.DOCUMENTATION_HOST;

export { HOST, DOCUMENTATION };
