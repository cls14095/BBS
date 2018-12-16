var router = require("express").Router();

router.get("/", (req, res) => {
  req.logout();
  res.redirect("/home");
});

module.exports = router;