const express = require("express");
const router = express.Router();
const csurf = require("tiny-csrf");

const userService = require("../services/user.service");
const { CSRF_SECRET } = require("../const");

const csrfMiddleware = csurf(CSRF_SECRET);

router.get("/signup", csrfMiddleware, async function (req, res, next) {
  const csrfToken = req.csrfToken();
  res.render("signup", { csrfToken });
});

router.post("/signup", csrfMiddleware, async function (req, res, next) {
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

router.get("/login", csrfMiddleware, async function (req, res, next) {
  const csrfToken = req.csrfToken();
  res.render("login", { csrfToken });
});

router.post("/login", csrfMiddleware, async function (req, res, next) {
  const {
    body: { login, password },
  } = req;

  const validationErrors = await userService.logIn({ login, password });

  if (!validationErrors) {
    req.session.user = {
      isLoggedIn: true,
      login: login,
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

  res.render("login", { login, password, validationErrors });
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
