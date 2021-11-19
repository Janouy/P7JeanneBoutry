const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.likesDisplay = (req, res) => {
  const query = "SELECT*FROM userLikes INNER JOIN post ON userLikes.post_Id = post.id_post WHERE userLikes.usersLiked=? OR userLikes.usersDisliked=?";
  const params=[req.params.id, req.params.id];
    db.query(query, params, (err,rows) => {
        if(err) {throw err};
        res.json({data:rows})
    });
  };