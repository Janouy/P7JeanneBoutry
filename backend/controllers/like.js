const db = require('../models/dbConnect');

exports.likesDisplay = (req, res) => {
	const query = "SELECT*FROM userLikes INNER JOIN post ON userLikes.post_Id = post.id_post";
	try{
		db.query(query, (err,rows) => {
			if(err) {
				console.error('Une erreur est survenue');
			};
			res.json({data:rows})
		});
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	};
};