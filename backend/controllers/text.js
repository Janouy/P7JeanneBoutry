const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

  exports.getAllTexts = (req, res) => {
    db.query('SELECT*FROM text JOIN users ON text.user_id = users.id', (err,rows) => {
        if(err) throw err;
        res.json({data:rows})
    });
}