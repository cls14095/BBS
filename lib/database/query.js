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


const registUsers = (username, password) => {
  return new Promise((resolve, reject) => {
    connection.query({
      sql: "INSERT INTO users VALUES (?, ?);",
      values: [username, password]
    }, (error, users) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(users);
    });
  });
};

const registPosts = (username, content) => {
  return new Promise((resolve, reject) => {
    connection.query({
      sql: "INSERT INTO posts (username, content) VALUES (?, ?);",
      values: [username, content]
    }, (error, users) => {
      if (error) {
        reject(error);
        return;
      }
      resolve(users);
    });
  });
};

const getPosts = (num) => {
  return new Promise((resolve, reject) => {
    connection.query({
      sql: "SELECT * FROM posts ORDER BY id DESC LIMIT ?;",
      values: [num]
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
  containsUsername,
  registUsers,
  registPosts,
  getPosts
};