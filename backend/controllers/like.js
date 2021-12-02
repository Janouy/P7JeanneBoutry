const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.likesDisplay = (req, res) => {
	const query = "SELECT*FROM userLikes INNER JOIN post ON userLikes.post_Id = post.id_post";
	try{
		db.query(query, (err,rows) => {
			if(err) {
				throw err
			};
			res.json({data:rows})
		});
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	};
};