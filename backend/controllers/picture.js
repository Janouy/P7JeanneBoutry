const mysql = require('mysql');
const fs = require('fs');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.addPicture = (req, res) => {
  const query="UPDATE users SET picture='NULL' WHERE id=?";
  const params=[req.params.id];
  db.query('SELECT picture FROM users WHERE id=?', params, (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
      let imageUrl = req.file.filename;
      let oldImage = rows[0].picture;
      const filename = oldImage.split('/images/') [1];
      fs.unlink(`images/${filename}`, () => {
        imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
        const query="UPDATE users SET picture=? where id=?";
        const params=[imageUrl, req.params.id]
        db.query(query,params)
      });
  });
};

exports.deletePicture = (req, res)=>{
  const query="UPDATE users SET picture='NULL' WHERE id=?";
  const params=[req.params.id];
  db.query('SELECT picture FROM users WHERE id=?', params, (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
      let imageUrl = rows[0].picture;
      const filename = imageUrl.split('/images/') [1];
      fs.unlink(`images/${filename}`, () => {
        db.query(query,params)
      });
  });
};


