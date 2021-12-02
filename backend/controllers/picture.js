const fs = require('fs');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.addPicture = (req, res) => {
	const params=[req.params.id];
	try{
	db.query('SELECT picture FROM users WHERE id=?', params, (err,rows) => {
		if(err) {
			throw err
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
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	}
};

exports.deletePicture = (req, res)=>{
	const query="UPDATE users SET picture='NULL' WHERE id=?";
	const params=[req.params.id];
	try{
		db.query('SELECT picture FROM users WHERE id=?', params, (err,rows) => {
			if(err) {
				throw err
			};
			res.json({data:rows})
			let imageUrl = rows[0].picture;
			const filename = imageUrl.split('/images/') [1];
			fs.unlink(`images/${filename}`, () => {
				db.query(query,params)
			});
		});
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	}
};


