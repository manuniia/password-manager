const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database(":memory:");

db.serialize(() => {
  db.run("CREATE TABLE users (login TEXT, password TEXT)");
  const stmt = db.prepare("INSERT INTO users VALUES (?, ?)");

  for (let i = 0; i < 10; i++) {
    stmt.run(`login ${i}`, `password ${i}`);
  }

  stmt.finalize();

  db.each("SELECT rowid AS id, login, password FROM users", (err, row) => {
    console.log(`id:${row.id} login:${row.login} password:${row.password}`);
  });
});

exports = { db };
