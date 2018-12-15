var { containsUsername } = require("../database/query");

const isFilledUsername = username => {
  return !username ? false : true;
};

const isFilledPassword = password => {
  return !password ? false : true;
};

const isUniqueUsername = async (username) => {
  var users = await containsUsername(username);
  return users.length !== 0 ? false : true;
};


module.exports = {
  isFilledUsername,
  isFilledPassword,
  isUniqueUsername
};