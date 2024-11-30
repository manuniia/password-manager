const handleErrors = (err, req, res, next) => {
  console.error(err.stack);
  res.render("server-error");
};

module.exports = { handleErrors };
