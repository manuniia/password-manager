const express = require("express");
const router = express.Router();
const { Database } = require("../db");
const userService = require("../services/user.service");

const db = new Database();

router.get("/", async function (req, res, _next) {
  const users = await db.all("SELECT rowid AS id, login, hash FROM users");

  res.render("index", { name: "Express", users });
});

router.get("/signup", async function (req, res, next) {
  res.render("signup");
});

router.post("/signup", async function (req, res, next) {
  const {
    body: { login, password, confirm_password },
  } = req;

  const validationErrors = await userService.signUp({
    login,
    password,
    confirm_password,
  });

  if (!validationErrors) {
    res.redirect("/login");
    return;
  }

  res.render("signup", {
    validationErrors,
    login,
    password,
    confirm_password,
  });
});

router.get("/login", async function (req, res, next) {
  res.render("login");
});

router.post("/login", async function (req, res, next) {
  const {
    body: { login, password },
  } = req;

  const validationErrors = await userService.logIn({ login, password });

  if (!validationErrors) {
    res.redirect("/dashboard");
    return;
  }

  res.render("login", { login, password, validationErrors });
});

router.get("/dashboard", async function (req, res, next) {
  res.render("dashboard");
});

module.exports = router;
