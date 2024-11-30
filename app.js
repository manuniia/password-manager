const express = require("express");
const helmet = require("helmet");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const app = express();
const session = require("express-session");
const SQLiteStore = require("connect-sqlite3")(session);

const indexRouter = require("./routes/index");
const { handleErrors } = require("./middleware/error.middleware");

const {
  DB_FILE_NAME,
  DB_FILE_FOLDER,
  SESSION_SECRET,
  SESSION_COOKIE_MAX_AGE,
  COOKIE_PARSER_SECRET,
} = require("./const");

app.use(helmet());

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
app.set("views", __dirname + "/views");
app.set("view engine", "jsx");
app.engine("jsx", require("express-react-views").createEngine());

app.use("/", indexRouter);
app.use(handleErrors);

module.exports = app;
