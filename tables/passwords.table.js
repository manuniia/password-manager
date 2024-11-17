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
  const { id } = await findById(id);
  return id;
}

async function list(search) {
  return db.get(
    `SELECT id, loginUrl, login FROM passwords WHERE loginUrl LIKE %$search%`,
    {
      $search: search,
    }
  );
}

async function remove(id) {
  return db.get(`DELETE FROM passwords WHERE id = $id`, {
    $id: id,
  });
}

module.exports = { findById, insert, list, remove };
