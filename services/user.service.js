const bcrypt = require("bcrypt");
const userTable = require("../tables/users.table");
const { SALT_ROUNDS } = require("../const");

async function signUp({ login, password, confirm_password }) {
  const validationErrors = {};
  let hasValidationErrors = false;

  if (!login) {
    validationErrors.login = "Login cannot be an empty string";
    hasValidationErrors = true;
  }

  if (!password) {
    validationErrors.password = "Password cannot be an empty string";
    hasValidationErrors = true;
  }

  if (!confirm_password) {
    validationErrors.confirm_password = "Password cannot be an empty string";
    hasValidationErrors = true;
  }

  if (password !== confirm_password) {
    validationErrors.confirm_password = "Password values do not match";
    hasValidationErrors = true;
  }

  const user = await userTable.findByLogin(login);

  if (user) {
    validationErrors.login = "Login is already taken";
    hasValidationErrors = true;
  }

  if (hasValidationErrors) {
    return validationErrors;
  }

  const hash = await bcrypt.hash(password, SALT_ROUNDS);
  await userTable.insert({ login, hash });

  return null;
}

async function logIn({ login, password }) {
  const validationErrors = {};
  let hasValidationErrors = false;

  if (!login) {
    validationErrors.login = "Login cannot be an empty string";
    hasValidationErrors = true;
  }

  if (!password) {
    validationErrors.password = "Password cannot be an empty string";
    hasValidationErrors = true;
  }

  if (hasValidationErrors) {
    return validationErrors;
  }

  const user = await userTable.findByLogin(login);
  if (!user) {
    validationErrors.password = "Either login or password is incorrect";
    return validationErrors;
  }

  isPasswordCorrect = await bcrypt.compare(password, user.hash);

  if (!isPasswordCorrect) {
    validationErrors.password = "Either login or password is incorrect";
    return validationErrors;
  }

  return null;
}

module.exports = { signUp, logIn };
