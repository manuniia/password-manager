require("dotenv").config();

const SALT_ROUNDS = 10;
const DB_FILE_NAME = "db.sqlite";
const DB_FILE_FOLDER = "./db";
const SESSION_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000; // 1 week

const DB_FILE_PATH = `${DB_FILE_FOLDER}${DB_FILE_NAME}`;
const SESSION_SECRET = process.env.SESSION_SECRET;

module.exports = {
  SALT_ROUNDS,
  DB_FILE_PATH,
  DB_FILE_NAME,
  DB_FILE_FOLDER,
  SESSION_SECRET,
  SESSION_COOKIE_MAX_AGE,
};
