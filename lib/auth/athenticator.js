const connection = require("../database/connection");
var passport = require("passport");
var LocalStorategy = require("passport-local").Strategy;

passport.serializeUser((username, done) => {
  console.log("serializeUser");
  return done(null, username);
});

passport.deserializeUser((username, done) => {
  console.log("deserializeUser");
  done(null, username);
});

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
        done(null, false, req.flash("message", "Username or Password is wrong."));
      }
    });
  })
);

const initialize = () => {
  return [
    passport.initialize(),
    passport.session()
  ];
};

const authenticate = () => {
  return passport.authenticate(
    "local-strategy", {
      successRedirect: "/",
      failureRedirect: "/login"
    }
  );
};

module.exports = {
  initialize,
  authenticate,
};