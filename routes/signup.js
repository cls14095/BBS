var router = require("express").Router();
var userRegister = require("../lib/account/registUsers.js");

router.get("/", (req, res) => {
  res.render("./account/signup.ejs");
});

router.post("/", async (req, res) => {
  let errors = await userRegister.validateRegistUserData(req.body);

  if (Object.keys(errors).length !== 0) {
    res.render("./account/signup.ejs", { errors });
  }
  else {
    //TODO:DBにデータ登録
    res.redirect("./complete");
  }
});

router.get("/complete", (req, res) => {
  res.render("./account/signup-complete.ejs");
});



module.exports = router;