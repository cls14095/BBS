var connection = require("./connection");


var insertUsers = function () {
  return Promise.all([
    connection.query("CREATE TABLE bbs.users (username varchar(20) not null primary key, password varchar(20) not null);"),
    connection.query("INSERT INTO bbs.users VALUES ('hayase','qwerty')")
  ]);
};

var insertPosts = function () {
  return Promise.all([
    connection.query("CREATE TABLE bbs.posts (id int not null primary key AUTO_INCREMENT, username varchar(20) not null, content varchar(100) not null);"),
  ]);
};

connection.connect((error) => {
  Promise.all([
    insertUsers(),
    insertPosts()
  ]).catch(() => {
    console.log(error);
  }).then(() => {
    connection.end();
  });
});
