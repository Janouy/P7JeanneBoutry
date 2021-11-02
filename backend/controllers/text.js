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
};

exports.getAllTextsOneUser = (req, res) => {
  db.query('SELECT*FROM text JOIN users ON text.user_id = users.id WHERE user_id = ?',[req.params.id], (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
  });
};

exports.addText = (req, res) => {
  const query="INSERT INTO text SET ?";
  const params={text:req.body.text, user_id:req.params.id}
  db.query(query,params,(err,result) => {
    if(err) throw err;
    res.json({saved:result.affectedRows,inserted_id:result.insertId})
  });
};

exports.deleteText = (req, res) => {
  const query="DELETE FROM text where id_post=?";
  const params=[req.params.id]
  db.query(query,params,(err,result,fields) => {
      if(err) throw err;
      res.json({deleted:result.affectedRows})
  });
};