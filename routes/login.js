var router = require("express").Router();
var Authenticator = require("../lib/auth/athenticator.js");

//TODO: ログイン時にUsername or passwordが入力されていない場合のエラー表示

router.get("/", (req, res) => {
  res.render("./account/login.ejs", { message: req.flash("message") });
});

router.post("/authenticate", Authenticator.authenticate());

router.get("/success", (req, res) => {
  res.render("./account/success.ejs");
});


module.exports = router;