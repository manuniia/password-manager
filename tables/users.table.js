var { Database } = require("../db");

const db = new Database();

async function findByLogin(login) {
  return db.get(`SELECT * FROM users WHERE login = $login`, {
    $login: login,
  });
}

async function insert({ login, hash }) {
  await db.run(`INSERT INTO users VALUES ( NULL, $login, $hash)`, {
    $login: login,
    $hash: hash,
  });

  const { id } = await findByLogin(login);

  return id;
}

module.exports = { findByLogin, insert };
