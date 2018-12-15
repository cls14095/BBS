var connection = require("./connection");

var insertPrivileges = function () {
  return Promise.all([
    connection.query("CREATE TABLE bbs.privileges (role varchar(20) not null primary key, permission varchar(20) not null);"),
    connection.query("INSERT INTO bbs.privileges VALUES ('default','read')"),
    connection.query("INSERT INTO bbs.privileges VALUES ('owner','readwrite')")
  ]);
};

var insertUsers = function () {
  return Promise.all([
    connection.query("CREATE TABLE bbs.users (username varchar(20) not null primary key, password varchar(20) not null);"),
    connection.query("INSERT INTO bbs.users VALUES ('hayase','qwerty')")
  ]);
};

connection.connect((error) => {
  if (error) {
    throw error;
  }

  Promise.all([
    insertUsers(),
    insertPrivileges()
  ]).catch(() => {
    console.log(error);
  }).then(() => {
    connection.end();
  });
});
