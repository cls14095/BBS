var router = require("express").Router();
var posts = require("../lib/posts/registPosts.js");

router.get("/", async (req, res) => {
  var isAuthenticated = req.isAuthenticated();
  var username = req.user;
  var postDatas = await posts.getPostsData(10);
  console.log(postDatas);
  res.render("./index.ejs", { isAuthenticated, username, postDatas });
});

router.post("/post", async (req, res) => {
  var isAuthenticated = req.isAuthenticated();
  var content = req.body.content;
  var username = req.user;

  var errors = await posts.validateRegistPostData(username, content);

  if (Object.keys(errors).length !== 0) {
    res.render("./", { isAuthenticated, username, errors });
  }
  else {
    posts.registPostData(username, content);
    res.redirect("./");
  }
});

module.exports = router;