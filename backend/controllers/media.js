const db = require('../models/dbConnect');

exports.addMedia = (req, res) => {
	let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
	const query="INSERT INTO post SET ?";
	const params={media:imageUrl, user_id:req.params.id, userLikes: 0, userDislikes: 0};
	try{
		db.query(query,params,(err,result) => {
			if(err) {
				throw err;
			};
			res.json({saved:result.affectedRows,inserted_id:result.insertId})
		})
	}catch (error) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
		console.error('Une erreur est survenue', error);
	};
};


