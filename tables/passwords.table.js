var { Database } = require("../db");

const db = new Database();

async function findById(id, userId) {
  return db.get(`SELECT * FROM passwords WHERE id = $id AND userId=$userId`, {
    $id: id,
    $userId: userId,
  });
}

async function insert({
  loginUrl,
  login,
  iv,
  salt,
  encryptedPassword,
  userId,
}) {
  await db.run(
    `INSERT INTO passwords VALUES ( NULL, $userId, $loginUrl, $login, $iv, $salt, $encryptedPassword)`,
    {
      $loginUrl: loginUrl,
      $login: login,
      $iv: iv,
      $salt: salt,
      $encryptedPassword: encryptedPassword,
      $userId: userId,
    }
  );
}

async function list(userId) {
  return db.all(
    `SELECT id, loginUrl, login FROM passwords WHERE userId=$userId`,
    { $userId: userId }
  );
}

async function remove(id, userId) {
  await db.run(`DELETE FROM passwords WHERE id = $id AND userId=$userId`, {
    $id: id,
    $userId: userId,
  });
}

module.exports = { findById, insert, list, remove };
