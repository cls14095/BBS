var { SESSION_SECRET_KEY } = require("./config/app.config.js").security;
var express = require("express");
var session = require("express-session");
var bodyParser = require("body-parser");
var passport = require("passport");

var app = express();

app.set("view engine", "ejs");
app.disable("x-powered-by");

app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    maxage: 1000 * 60 * 30
  }
}));

app.use(bodyParser.urlencoded({ extended: true }));


app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use("/", require("./routes/index.js"));

app.listen(3000);