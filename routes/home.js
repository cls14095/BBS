var router = require("express").Router();

router.get("/", (req, res) => {
  var date = new Date();
  console.log(date);
  var isAuthenticated = req.isAuthenticated();
  var username = req.user;
  res.render("./index.ejs", { isAuthenticated, username });
});

router.post("/post", (req, res) => {
  //TODO:DB追加
});

module.exports = router;