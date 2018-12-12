var mysql = require("mysql");
var passport = require("passport");
var LocalStorategy = require("passport-local").Strategy;

class Authenticator {
  static initialize(app) {
    app.use(passport.initialize());
    app.use(passport.session());

    passport.serializeUser((username, done) => {
      return done(null, username);
    });

    passport.deserializeUser((username, done) => {
    });

  }
}