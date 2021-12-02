const mysql = require('mysql');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

  function connectionToMysql(){
      return db
  };

  module.export = connectionToMysql();