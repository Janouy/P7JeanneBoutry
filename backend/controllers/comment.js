const mysql = require('mysql');
const fs = require('fs');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });


exports.getAllComments = (req, res) => {
  db.query(' SELECT*FROM comment INNER JOIN post ON comment.post_id=post.id_post INNER JOIN users ON comment.user_id = users.id ORDER BY id_comment DESC', (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
  });
};

exports.addComment = (req, res) => {
  const query="INSERT INTO comment SET ?";
  const params={comment:req.body.comment, user_id:req.body.userId, post_id:req.params.id}
  db.query(query,params,(err,result) => {
    if(err) throw err;
    res.json({saved:result.affectedRows,inserted_id:result.insertId})
  }); 
};

// non fait//
exports.deleteComment = (req, res) => {
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
