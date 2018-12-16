const query = require("../database/query.js");
const validator = require("./validatePosts.js");

const validateRegistPostData = async (username, content) => {
  var errors = {};
  if (!validator.isFilledUsername(username)) {
    errors.username = "usernameが未入力です";
  }
  if (!validator.isFilledContent(content)) {
    errors.content = "contentが未入力です";
  }

  return errors;
};

const registPostData = async (username, content) => {
  await query.registPosts(username, content);
  return true;
};

const getPostsData = async (num) => {
  var datas = await query.getPosts(num);
  return datas;
};



module.exports = {
  validateRegistPostData,
  registPostData,
  getPostsData
};