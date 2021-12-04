const fs = require('fs');
const db = require('../models/dbConnect');

exports.addPicture = (req, res) => {
	const params=[req.params.id];
	try{
	db.query('SELECT picture FROM users WHERE id=?', params, (err,rows) => {
		if(err) {
			throw err;
		};
		res.json({data:rows})
		if(rows[0].picture != null){
			let imageUrl = req.file.filename;
			let oldImage = rows[0].picture;
			const filename = oldImage.split('/images/') [1];
			fs.unlink(`images/${filename}`, () => {
				imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
				const query="UPDATE users SET picture=? where id=?";
				const params=[imageUrl, req.params.id];
				db.query(query,params);
			}); 
		}else{
			let imageUrl = req.file.filename;
			imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
			const query="UPDATE users SET picture=? where id=?";
			const params=[imageUrl, req.params.id];
			db.query(query,params);
		}
	})
	}catch (error) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
		console.error('Une erreur est survenue', error);
	}
};

exports.deletePicture = (req, res)=>{
	const query="UPDATE users SET picture='NULL' WHERE id=?";
	const params=[req.params.id];
	try{
		db.query('SELECT picture FROM users WHERE id=?', params, (err,rows) => {
			if(err) {
				throw err;
			};
			res.json({data:rows})
			let imageUrl = rows[0].picture;
			const filename = imageUrl.split('/images/') [1];
			fs.unlink(`images/${filename}`, () => {
				db.query(query,params)
			});
		});
	}catch (error) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard'});
		console.error('Une erreur est survenue', error);
	}
};


