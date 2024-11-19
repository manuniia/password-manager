const express = require("express");
const router = express.Router();
const csurf = require("tiny-csrf");

const { isAuth } = require("../middleware/auth.middleware");
const authRouter = require("./auth.routes");
const passwordsRouter = require("./passwords.routes");
const { CSRF_SECRET } = require("../const");

router.get("/", async function (req, res, _next) {
  res.render("home", { user: req.session.user });
});

router.use("/", authRouter);
router.use("/", csurf(CSRF_SECRET), isAuth, passwordsRouter);

router.get("/healthz", async function (req, res, _next) {
  return res.status(200);
});

router.get("*", async function (req, res, _next) {
  res.render("not-found", { user: req.session.user });
});

module.exports = router;
