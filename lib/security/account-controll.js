var { MYSQL_PASSWORD } = require("../../config/app.config").security;
var passport = require("passport");
var LocalStorategy = require("passport-local").Strategy;
var mysql = require("mysql");
var connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: MYSQL_PASSWORD,
  database: "bbs"
});

connection.connect((error) => {
  if (error) {
    throw error;
  }
  console.log("connected as id " + connection.threadId);
});


class Authenticator {
  static initialize(app) {
    console.log("initialize");
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((username, done) => {
      console.log("serializeUser");
      return done(null, username);
    });

    passport.deserializeUser((username, done) => {
      console.log("deserializeUser");
      done(null, username);
    });
  }

  static setStrategy() {
    console.log("setStrategy");
    passport.use("local-strategy",
      new LocalStorategy({
        usernameField: "username",
        passwordField: "password",
        passReqToCallback: true
      }, (req, username, password, done) => {
        connection.query("SELECT * FROM users WHERE username = ? AND password = ?;", [username, password], (error, users) => {
          if (users.length == 1) {
            req.session.regenerate((error) => {
              if (error) {
                done(error);
              }
              else {
                done(null, users[0].username);
              }
            });
          } else {
            console.log("false");
            done(null, false, req.flash("message", "Username or Password is wrong."));
          }
        });
      })
    );
  }

  static authenticate() {
    console.log("authenticate");
    return passport.authenticate(
      "local-strategy", {
        successRedirect: "/",
        failureRedirect: "/login"
      });
  }
}



module.exports = Authenticator;