var router = require("express").Router();
var Authenticator = require("../lib/security/account-controll");

router.get("/", (req, res) => {
  res.render("./account/login.ejs", { message: req.flash("message") });
});

router.post("/authenticate", Authenticator.authenticate());

router.get("/success", (req, res) => {
  res.render("./account/success.ejs");
});


module.exports = router;