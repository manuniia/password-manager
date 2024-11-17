const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);
const csurf = require("tiny-csrf");

const indexRouter = require("./routes/index");

const {
  DB_FILE_NAME,
  DB_FILE_FOLDER,
  SESSION_SECRET,
  SESSION_COOKIE_MAX_AGE,
  CSRF_SECRET,
  COOKIE_PARSER_SECRET,
} = require("./const");

app.use(
  session({
    store: new SQLiteStore({
      db: DB_FILE_NAME,
      dir: DB_FILE_FOLDER,
    }),
    secret: SESSION_SECRET,
    resave: true,
    saveUninitialized: false,
    cookie: { maxAge: SESSION_COOKIE_MAX_AGE },
  })
);

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(COOKIE_PARSER_SECRET));
app.use(express.static(path.join(__dirname, "public")));

// prevent the browser from caching pages and reload them with a fresh CSRF token
app.use((req, res, next) => {
  res.set(
    "Cache-Control",
    "no-store, no-cache, must-revalidate, proxy-revalidate"
  );
  res.set("Pragma", "no-cache");
  res.set("Expires", "0");
  next();
});

// use CSRF middleware to check if CSRF token is valid
app.use(
  csurf(
    CSRF_SECRET, // secret -- must be 32 bits or chars in length
    ["POST"] // the request methods we want CSRF protection for
  )
);

// regenerate CSRF token for all GET requests
app.use((req, res, next) => {
  if (req.method === "GET") {
    res.locals.csrfToken = req.csrfToken();
  }
  next();
});

app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.use("/", indexRouter);

module.exports = app;
