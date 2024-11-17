const isAuth = (req, res, next) => {
  if (!req.session?.user?.isLoggedIn) {
    res.redirect("/login");
    return;
  }

  next();
};

module.exports = { isAuth };
