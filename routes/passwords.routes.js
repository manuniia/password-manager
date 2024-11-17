const express = require("express");
const router = express.Router();

const passwordsService = require("../services/passwords.service");

router.get("/", async function (req, res, _next) {
  res.render("home", { user: req.session.user });
});

router.get("/passwords", async function (req, res, next) {
  const { user } = req.session;
  const rows = await passwordsService.list();
  res.render("passwords", { user, rows });
});

router.get("/passwords/new", async function (req, res, next) {
  const { user } = req.session;
  const csrfToken = req.csrfToken();

  res.render("new-password", {
    user,
    csrfToken,
    loginUrl: "google.com",
    login: "user",
    password: "pass",
    masterPassword: "master",
  });
});

router.post("/passwords", async function (req, res, next) {
  const { loginUrl, login, password, masterPassword } = req.body;
  const result = await passwordsService.insert({
    loginUrl,
    login,
    password,
    masterPassword,
  });

  if (result === null) {
    return res.redirect("/passwords");
  }

  const csrfToken = req.csrfToken();
  const { user } = req.session;

  res.render("new-password", {
    user,
    csrfToken,
    loginUrl,
    login,
    password,
    masterPassword,
    validationErrors: result,
  });
});

module.exports = router;
