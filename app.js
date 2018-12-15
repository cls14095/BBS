var { SESSION_SECRET_KEY } = require("./config/app.config.js").security;
var authenticator = require("./lib/auth/athenticator");
var express = require("express");
var bodyParser = require("body-parser");
var session = require("express-session");
var flash = require("connect-flash");


var app = express();

app.set("view engine", "ejs");
app.disable("x-powered-by");

app.use("/public", express.static(__dirname + "/public/" + (process.env.NODE_ENV === "development" ? "development" : "production")));

app.use(session({
  secret: SESSION_SECRET_KEY,
  resave: false,
  saveUninitialized: false,
  name: "sid",
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(flash());
app.use(...authenticator.initialize());

app.use("/", require("./routes/index.js"));
app.use("/signup", require("./routes/signup.js"));
app.use("/login", require("./routes/login.js"));



app.listen(3000);