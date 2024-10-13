const sqlite3 = require("sqlite3").verbose();
const { DB_FILE_PATH } = require("../const");

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = new sqlite3.Database(DB_FILE_PATH);
    this.init();

    Database.instance = this;
  }

  init() {
    this.connection.serialize(() => {
      this.connection.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY,
            login TEXT UNIQUE,
            hash TEXT
        )`
      );
    });
  }

  async all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.all(query, params, function (err, rows) {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows);
      });
    });
  }

  async get(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.get(query, params, function (err, row) {
        if (err) {
          reject(err);
          return;
        }

        resolve(row);
      });
    });
  }

  async run(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.run(query, params, function (err) {
        if (err) {
          reject(err);
          return;
        }

        resolve();
      });
    });
  }
}

module.exports = { Database };
