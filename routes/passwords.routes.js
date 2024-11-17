const express = require("express");
const { isAuth } = require("../middleware/auth.middleware");
const router = express.Router();

router.get("/", async function (req, res, _next) {
  res.render("home", { user: req.session.user });
});

router.get("/passwords", isAuth, async function (req, res, next) {
  const { user } = req.session;
  res.render("passwords", { user });
});

router.get("/passwords/new", async function (req, res, next) {});

module.exports = router;
