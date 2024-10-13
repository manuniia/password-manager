const sqlite3 = require("sqlite3").verbose();

class Database {
  constructor() {
    if (Database.instance) {
      return Database.instance;
    }

    this.connection = new sqlite3.Database(":memory:");

    this.connection.serialize(() => {
      this.connection.run("CREATE TABLE users (login TEXT, password TEXT)");
      const stmt = this.connection.prepare("INSERT INTO users VALUES (?, ?)");

      for (let i = 0; i < 10; i++) {
        stmt.run(`login ${i}`, `password ${i}`);
      }

      stmt.finalize();
    });

    Database.instance = this;
  }

  async all(query, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.all(query, params, (err, rows) => {
        if (err) {
          reject(err);
          return;
        }

        resolve(rows);
      });
    });
  }
}

module.exports = { Database };
