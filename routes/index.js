const express = require("express");
const router = express.Router();
const { Database } = require("../db");
const userService = require("../services/user.service");

const db = new Database();

const isAuth = (req, res, next) => {
  if (!req.session?.user?.isLoggedIn) {
    res.redirect("/login");
    return;
  }

  next();
};

router.get("/", async function (req, res, _next) {
  if (req.session.user?.isLoggedIn) {
    res.redirect("/dashboard");
    return;
  }

  res.render("/home");

  onClick(router.push("/login"));
  // res.redirect("/login"); // fix: user should go to login page by clicking a button
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

    res.redirect("/dashboard");
    return;
  }

  res.render("login", { login, password, validationErrors });
});

router.get("/dashboard", isAuth, async function (req, res, next) {
  const { user } = req.session;

  res.render("dashboard", { user });
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
