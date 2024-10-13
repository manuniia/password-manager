var express = require("express");
var router = express.Router();

var { Database } = require("../db");

const db = new Database();

/* GET home page. */
router.get("/", async function (req, res, _next) {
  const users = await db.all("SELECT rowid AS id, login, password FROM users");
  res.render("index", { name: "Express", users });
});

module.exports = router;
