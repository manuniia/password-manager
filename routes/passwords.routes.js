const express = require("express");
const router = express.Router();

const passwordsService = require("../services/passwords.service");

router.get("/", async function (req, res, next) {
  const { user } = req.session;
  const rows = await passwordsService.list(user.id);
  res.render("passwords", { user, rows });
});

router.get("/new", async function (req, res, next) {
  const { user } = req.session;
  const csrfToken = req.csrfToken();

  res.render("new-password", {
    user,
    csrfToken,
  });
});

router.post("/", async function (req, res, next) {
  const { user } = req.session;
  const { loginUrl, login, password, masterPassword } = req.body;
  const result = await passwordsService.insert({
    loginUrl,
    login,
    password,
    masterPassword,
    userId: user.id,
  });

  if (result === null) {
    return res.redirect("/passwords");
  }

  const csrfToken = req.csrfToken();

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

router.get("/:id", async function (req, res, next) {
  const { id } = req.params;
  const csrfToken = req.csrfToken();
  const { user } = req.session;

  const row = await passwordsService.findById(id, user.id);

  if (!row) {
    return res.render("not-found", { user: req.session.user });
  }

  res.render("show-password", { id, csrfToken, user });
});

router.post("/:id", async function (req, res, next) {
  const { id, masterPassword } = req.body;
  const csrfToken = req.csrfToken();
  const { user } = req.session;

  const row = await passwordsService.findByIdAndDecrypt({
    id,
    masterPassword,
    userId: user.id,
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

router.get("/:id/delete", async function (req, res, next) {
  const { id } = req.params;
  const csrfToken = req.csrfToken();
  const { user } = req.session;

  const row = await passwordsService.findById(id, user.id);

  if (!row) {
    return res.render("not-found", { user: req.session.user });
  }

  res.render("delete-password", { id, csrfToken, user });
});

router.post("/:id/delete", async function (req, res, next) {
  const { id, masterPassword } = req.body;
  const csrfToken = req.csrfToken();
  const { user } = req.session;

  const success = await passwordsService.findByIdAndDelete({
    id,
    masterPassword,
    userId: user.id,
  });

  if (!success) {
    const validationErrors = {
      masterPassword: "Please check the master password",
    };
    return res.render("delete-password", {
      id,
      csrfToken,
      user,
      masterPassword,
      validationErrors,
    });
  }

  res.redirect("/passwords");
});

module.exports = router;
