const { randomBytes, createCipheriv, createDecipheriv } = require("crypto");

const ALGORITHM = "aes-256-cbc";

const decryptCookie = (cookie, _secret) => {
  /**
   * Decrypt a cookie using AES 256 bits
   * @param {cookie} string the cookie we want to encrypt. Will be visible as plain string to client.
   * @param {_secret} string the secret that will be stored server-side. Client will never see this.
   */

  if (cookie === "j:null") {
    return;
  }
  const _encryptedArray = cookie.split(":");
  if (_encryptedArray.length != 2) throw new Error("bad decrypt");

  const iv = new Buffer.from(_encryptedArray[0], "hex");
  const encrypted = new Buffer.from(_encryptedArray[1], "hex");
  const decipher = createDecipheriv(ALGORITHM, _secret, iv);
  const decrypted =
    decipher.update(encrypted, "hex", "utf8") + decipher.final("utf8");
  return decrypted;
};

const csrfDebug = (secret) => (req, res, next) => {
  const formToken = req.body?._csrf;
  const { csrfToken: encryptedCookieToken } = req.signedCookies;
  const decryptedCookieToken =
    encryptedCookieToken && decryptCookie(encryptedCookieToken, secret);

  console.warn({
    secret,
    encryptedCookieToken,
    valid: formToken === decryptedCookieToken,
    formToken,
    decryptedCookieToken,
  });

  next();
};

module.exports = { csrfDebug };
