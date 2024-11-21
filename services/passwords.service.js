const crypto = require("crypto");
const passwordsTable = require("../tables/passwords.table");

const ENCRYPTION_ITERATIONS = 100000;
const ENCRYPTION_KEYLEN = 32;
const ENCRYPTION_DIGEST = "sha256";
const ENCRYPTION_ALGORITHM = "aes-256-cbc";
const IV_VECTOR_LENGTH = 16;
const SALT_LENGTH = 16;
const UTF8 = "utf8";
const HEX = "hex";

async function insert({ loginUrl, login, password, masterPassword, userId }) {
  const validationErrors = validateInsertData({
    loginUrl,
    login,
    password,
    masterPassword,
  });

  if (validationErrors) {
    return validationErrors;
  }

  const { encryptedPassword, iv, salt } = encrypt(password, masterPassword);
  await passwordsTable.insert({
    loginUrl,
    login,
    iv,
    salt,
    encryptedPassword,
    userId,
  });

  return null;
}

function validateInsertData({ loginUrl, login, password, masterPassword }) {
  const validationErrors = {};
  let hasValidationErrors = false;

  if (!loginUrl) {
    validationErrors.loginUrl = "Login url cannot be an empty string";
    hasValidationErrors = true;
  }

  if (!login) {
    validationErrors.login = "Login cannot be an empty string";
    hasValidationErrors = true;
  }

  if (!password) {
    validationErrors.password = "Password cannot be an empty string";
    hasValidationErrors = true;
  }

  if (!masterPassword) {
    validationErrors.masterPassword =
      "Master password cannot be an empty string";
    hasValidationErrors = true;
  }

  return hasValidationErrors ? validationErrors : null;
}

function deriveKey(masterPassword, salt) {
  return crypto.pbkdf2Sync(
    masterPassword,
    salt,
    ENCRYPTION_ITERATIONS,
    ENCRYPTION_KEYLEN,
    ENCRYPTION_DIGEST
  );
}

function encrypt(password, masterPassword) {
  const iv = crypto.randomBytes(IV_VECTOR_LENGTH); // Initialization vector
  const salt = crypto.randomBytes(SALT_LENGTH); // Salt for key derivation
  const key = deriveKey(masterPassword, salt);

  const cipher = crypto.createCipheriv(ENCRYPTION_ALGORITHM, key, iv);
  let encrypted = cipher.update(password, UTF8, HEX);
  encrypted += cipher.final(HEX);

  return {
    encryptedPassword: encrypted,
    iv: iv.toString(HEX),
    salt: salt.toString(HEX),
  };
}

async function list(userId) {
  const rows = await passwordsTable.list(userId);
  return rows;
}

async function findById(id, userId) {
  const row = await passwordsTable.findById(id, userId);
  return row;
}

async function findByIdAndDecrypt({ id, masterPassword, userId }) {
  const row = await passwordsTable.findById(id, userId);

  if (!row) {
    return null;
  }

  const { login, loginUrl, encryptedPassword, iv, salt } = row;

  try {
    const password = decrypt(encryptedPassword, masterPassword, iv, salt);

    return {
      id,
      login,
      loginUrl,
      password,
    };
  } catch (error) {
    return null;
  }
}

async function findByIdAndDelete({ id, masterPassword, userId }) {
  const row = await passwordsTable.findById(id, userId);

  if (!row) {
    return null;
  }

  const { encryptedPassword, iv, salt } = row;

  try {
    decrypt(encryptedPassword, masterPassword, iv, salt);
  } catch (error) {
    return null;
  }

  await passwordsTable.remove(id, userId);
  return true;
}

function decrypt(encryptedPassword, masterPassword, ivHex, saltHex) {
  const iv = Buffer.from(ivHex, HEX);
  const salt = Buffer.from(saltHex, HEX);
  const key = deriveKey(masterPassword, salt);

  const decipher = crypto.createDecipheriv(ENCRYPTION_ALGORITHM, key, iv);
  let decrypted = decipher.update(encryptedPassword, HEX, UTF8);
  decrypted += decipher.final(UTF8);

  return decrypted;
}

module.exports = {
  insert,
  list,
  findById,
  findByIdAndDecrypt,
  findByIdAndDelete,
};
