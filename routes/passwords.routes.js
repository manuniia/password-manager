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

router.get("/passwords/:id", async function (req, res, next) {
  const { id } = req.params;
  const csrfToken = req.csrfToken();
  const { user } = req.session;

  const row = await passwordsService.findById(id);

  if (!row) {
    return res.render("not-found", { user: req.session.user });
  }

  res.render("show-password", { id, csrfToken, user });
});

router.post("/passwords/:id", async function (req, res, next) {
  const { id, masterPassword } = req.body;
  const csrfToken = req.csrfToken();
  const { user } = req.session;

  const row = await passwordsService.findByIdAndDecrypt({
    id,
    masterPassword,
  });

  if (!row) {
    const validationErrors = {
      masterPassword: "Please check the master password",
    };
    return res.render("show-password", {
      id,
      csrfToken,
      user,
      masterPassword,
      validationErrors,
    });
  }

  res.render("passwords", { user, rows: [row], hideAddButton: true });
});

module.exports = router;
