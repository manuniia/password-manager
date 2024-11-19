const express = require("express");
const router = express.Router();

const { isAuth } = require("../middleware/auth.middleware");
const authRouter = require("./auth.routes");
const passwordsRouter = require("./passwords.routes");

router.get("/", async function (req, res, _next) {
  res.render("home", { user: req.session.user });
});

router.use("/", authRouter);
router.use("/", isAuth, passwordsRouter);

router.get("/healthz", async function (req, res, _next) {
  console.warn("Health check!");
  return res.status(200);
});

router.get("*", async function (req, res, _next) {
  res.render("not-found", { user: req.session.user });
});

module.exports = router;
