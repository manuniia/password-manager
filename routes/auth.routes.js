const express = require("express");
const router = express.Router();

const userService = require("../services/user.service");

router.get("/signup", async function (req, res, next) {
  const csrfToken = req.csrfToken();
  res.render("signup", { csrfToken });
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
    res.redirect("/auth/login");
    return;
  }

  const csrfToken = req.csrfToken();
  res.render("signup", {
    validationErrors,
    login,
    password,
    confirm_password,
    csrfToken,
  });
});

router.get("/login", async function (req, res, next) {
  const csrfToken = req.csrfToken();
  res.render("login", { csrfToken });
});

router.post("/login", async function (req, res, next) {
  const {
    body: { login, password },
  } = req;

  const { validationErrors, user } = await userService.logIn({
    login,
    password,
  });

  if (!validationErrors) {
    req.session.user = {
      isLoggedIn: true,
      login,
      id: user.id,
    };

    req.session.save((err) => {
      if (!err) {
        return;
      }
      console.log("Error saving session", err);
    });

    res.redirect("/passwords");
    return;
  }

  const csrfToken = req.csrfToken();
  res.render("login", { login, password, validationErrors, csrfToken });
});

router.get("/logout", async function (req, res, next) {
  req.session.destroy((err) => {
    if (err) {
      console.log("Error destroying session", err);
    } else {
      res.redirect("/");
    }
  });
});

module.exports = router;
