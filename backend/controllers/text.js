const fs = require('fs');
const db = require('../models/dbConnect');

exports.getAllTexts = (req, res) => {
	try{
		db.query('SELECT*FROM post INNER JOIN users ON users.id = post.user_id OR user_id IS NULL ORDER BY post.id_post DESC', (err,rows) => {
		if(err) {
			throw err
		};
		res.json({data:rows})
		});
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	};
};

exports.getAllTextsOneUser = (req, res) => {
	try{
		db.query('SELECT*FROM post JOIN users ON post.user_id = users.id WHERE user_id = ?',[req.params.id], (err,rows) => {
			if(err) {
				throw err
			};
			res.json({data:rows})
		});
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	};
};

exports.addText = (req, res) => {
	const query="INSERT INTO post SET ?";
	const params={text:req.body.text, user_id:req.body.id, userLikes: 0, userDislikes: 0};
	try{
		db.query(query,params,(err,result) => {
			if(err) {
				throw err
			};
			res.json({saved:result.affectedRows,inserted_id:result.insertId})
		});
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	};
};

exports.deleteText = (req, res) => {
	const query="DELETE FROM post WHERE id_post=?";
	const params=[req.params.id];
	try{
		db.query('SELECT media FROM post WHERE id_post=?', params, (err,rows) => {
			if(err) {
				throw err
			};
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
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	};
};

exports.likeText = (req, res, next) => {
	const postId = req.params.id;
	const like = req.body.like;
	const userId = req.body.userId;
	try{
		if(like == 1){
			const query="UPDATE post SET likes=likes+? WHERE id_post=?";
			const params=[like, postId];
			db.query(query,params,(err,result) => {
				if(err) {throw err};
				res.json({updated:result.affectedRows})
				const query="UPDATE post SET userLikes=CONCAT(userLikes,' ',?) WHERE id_post=?"; 
				const params=[userId, postId];
				db.query(query,params)
			}); 
		}else if(like == -1){
			const query="UPDATE post SET dislikes=dislikes+1 WHERE id_post=?";
			const params=[postId];
			db.query(query,params,(err,result) => {
				if(err) {throw err};
				res.json({updated:result.affectedRows})
				const query="UPDATE post SET userDislikes=CONCAT(userDislikes,' ',?) WHERE id_post=?"; 
				const params=[userId, postId];
				db.query(query,params)
			}); 
		}else if(like == 0){
			const query = "SELECT INSTR(userLikes, ?) AS indexLike, INSTR(userDislikes, ?) AS indexDislike FROM post WHERE id_post=?";
			const params=[userId, userId, postId]; 
			db.query(query,params,(err,rows) => {
				if(err) {throw err};
				res.json({data:rows})
				if(rows[0].indexLike != 0){
					const query="UPDATE post SET userLikes=REPLACE(userLikes, ?, '') WHERE id_post=?";
					const params=[' '+userId, postId];
					db.query(query,params);
					const query3 = "UPDATE post SET likes=likes-1 WHERE id_post=?";
					const params3 = [postId];
					db.query(query3, params3);
				}else if(rows[0].indexDislike != 0){
					const query="UPDATE post SET userDislikes=REPLACE(userDislikes, ?, '') WHERE id_post=?"; 
					const params=[' '+userId, postId];
					db.query(query,params);
					const query3 = "UPDATE post SET dislikes=dislikes-1 WHERE id_post=?";
					const params3 = [postId];
					db.query(query3, params3);
				}
			}); 
		} 
	}catch (err) {
		res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
	}
};

