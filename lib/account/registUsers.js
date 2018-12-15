const query = require("../database/query.js");
const validator = require("./validateUsers.js");

const validateRegistUserData = async (body) => {
  var errors = {};
  if (!validator.isFilledUsername(body.username)) {
    errors.username = "usernameが未入力です";
  }
  if (!validator.isFilledPassword(body.password)) {
    errors.password = "passwordが未入力です";
  }

  if (Object.keys(errors).length === 0 &&
    !await validator.isUniqueUsername(body.username)) {
    console.log("now");
    errors.username = "usernameは既に使用されています。 ";
  }
  return errors;
};

const registUserData = async (username, password) => {
  console.log(username);
  var users = await query.registUsers(username, password);
  console.log(users);
  return true;
};


module.exports = {
  validateRegistUserData,
  registUserData
};