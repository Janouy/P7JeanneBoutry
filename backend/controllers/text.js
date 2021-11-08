const mysql = require('mysql');
const fs = require('fs');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.getAllTexts = (req, res) => {
  db.query('SELECT*FROM post JOIN users ON post.user_id = users.id', (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
  });
};

exports.getAllTextsOneUser = (req, res) => {
  db.query('SELECT*FROM post JOIN users ON post.user_id = users.id WHERE user_id = ?',[req.params.id], (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
  });
};

exports.addText = (req, res) => {
  const query="INSERT INTO post SET ?";
  const params={text:req.body.text, user_id:req.params.id}
  db.query(query,params,(err,result) => {
    if(err) throw err;
    res.json({saved:result.affectedRows,inserted_id:result.insertId})
  });
};

exports.deleteText = (req, res) => {
  const query="DELETE FROM post where id_post=?";
  const params=[req.params.id];
  db.query('SELECT media FROM post WHERE id_post=?', params, (err,rows) => {
    if(err) throw err;
    res.json({data:rows})
    let imageUrl = rows[0].media;
    if(imageUrl == null){
      db.query(query,params)
    }else{
    const filename = imageUrl.split('/images/') [1];
    fs.unlink(`images/${filename}`, () => {
      db.query(query,params)
    });
  }
  });
};
