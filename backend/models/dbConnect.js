const mysql = require('mysql');

const mydb = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
});

function connectionToMysql(){
    return mydb
};

module.exports = connectionToMysql();