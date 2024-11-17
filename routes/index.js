const express = require("express");
const router = express.Router();
const authRouter = require("./auth.routes");
const passwordsRouter = require("./passwords.routes");

router.get("/", async function (req, res, _next) {
  res.render("home", { user: req.session.user });
});

router.use("/", authRouter);
router.use("/", passwordsRouter);

module.exports = router;
