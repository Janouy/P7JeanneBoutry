const mysql = require('mysql');
const fs = require('fs');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });


exports.getAllComments = (req, res) => {
  db.query('SELECT*FROM comment INNER JOIN post ON comment.post_id=post.id_post INNER JOIN users ON comment.id_user = users.id OR comment.id_user IS NULL ORDER BY id_comment DESC', (err,rows) => {
      if(err) throw err;
      res.json({data:rows})
  });
};

exports.addComment = (req, res) => {
  const query="INSERT INTO comment SET ?";
  const params={comment:req.body.comment, id_user:req.body.userId, post_id:req.params.id}
  db.query(query,params,(err,result) => {
    if(err) throw err;
    res.json({saved:result.affectedRows,inserted_id:result.insertId})
  }); 
};


exports.deleteComment = (req, res) => {
  console.log(req.params.id);
  const query="DELETE FROM comment WHERE id_comment=?";
    const params=[req.params.id]
    db.query(query,params,(err,result,fields) => {
        if(err) throw err;
        res.json({deleted:result.affectedRows})
    }); 
};
