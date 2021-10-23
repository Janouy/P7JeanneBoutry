const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });