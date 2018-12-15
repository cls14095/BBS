const connection = require("./connection.js");

const containsUsername = username => {
  return new Promise((resolve, reject) => {
    connection.query({
      sql: "SELECT * FROM users WHERE username = ?;",
      values: [username]
    }, (error, users) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(users);
    });
  });
};

module.exports = {
  containsUsername
};