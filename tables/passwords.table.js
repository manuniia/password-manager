var { Database } = require("../db");

const db = new Database();

async function findById(id) {
  return db.get(`SELECT * FROM passwords WHERE id = $id`, {
    $id: id,
  });
}

async function insert({ loginUrl, login, iv, salt, encryptedPassword }) {
  await db.run(
    `INSERT INTO passwords VALUES ( NULL, $loginUrl, $login, $iv, $salt, $encryptedPassword)`,
    {
      $loginUrl: loginUrl,
      $login: login,
      $iv: iv,
      $salt: salt,
      $encryptedPassword: encryptedPassword,
    }
  );
}

async function list() {
  return db.all(`SELECT id, loginUrl, login FROM passwords`);
}

async function remove(id) {
  return db.get(`DELETE FROM passwords WHERE id = $id`, {
    $id: id,
  });
}

module.exports = { findById, insert, list, remove };
