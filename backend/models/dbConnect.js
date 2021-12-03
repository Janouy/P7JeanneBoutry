const mysql = require('mysql');
const dotenv = require("dotenv");
dotenv.config();

const mydb = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE,
});

function connectionToMysql(){
    return mydb
};

module.exports = connectionToMysql();