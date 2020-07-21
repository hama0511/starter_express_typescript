import logger from "./logger";
import dotenv from "dotenv";
import fs from "fs";

if (fs.existsSync(".env")) {
    logger.debug("Using .env file to supply config environment variables");
    dotenv.config({ path: ".env" });
}

export const DB_URL = process.env["DB_URL"];
export const USERNAME = process.env["USERNAME"];
export const PASSWORD = process.env["PASSWORD"];