const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.signup = (req, res) => {
    db.query('SELECT * FROM users where email=?',[req.body.email], (err,rows) => {
        if(err) {throw err};
        if(rows.length == 0) {
            bcrypt.hash(req.body.password, 10)
            .then(hash =>{
                const query="INSERT INTO users SET ?";
                const params={email:req.body.email, password:hash, firstName: req.body.firstName, lastName: req.body.lastName}
                db.query(query,params,(err,result) => {
                    if(err) {throw err};
                    res.json({saved:result.affectedRows,inserted_id:result.insertId})
                });
            })
            .catch(error => res.status(500).json({error})); 
        }else{
            return res.status(401).json({error: 'utilisateur déjà existant'})
        };
    });
};

exports.login = (req, res, next) => {
    db.query('SELECT * FROM users where email=?',[req.body.email], (err,rows) => {
        if(err) {throw err};
        if(rows.length > 0) {
            bcrypt.compare(req.body.password, rows[0].password)
            .then (valid => {
                if(!valid) {
                    return res.status(401).json({error: 'Mot de passe incorrect'})
                }
                res.status(200).json({
                    id: rows[0].id,
                    token: jwt.sign(
                    { userId: rows[0].id},
                      'RANDOM_TOKEN_SECRET',
                      { expiresIn: '365d'}
                    )
                });
            })
            .catch(error => res.status(500).json({error}))
        }
        else{
            return res.status(401).json({error: 'utilisateur non trouvé'})
        };
    })
}; 

exports.modifyUser = (req, res) => {
    if(req.body.password){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            const query="UPDATE users SET email=?, lastName=?, firstName=?, description=?, password=? where id=?";
            const params=[req.body.email, req.body.lastName, req.body.firstName, req.body.description, hash, req.params.id]
            db.query(query,params,(err,result,fields) => {
                if(err) {throw err};
                res.json({updated:result.affectedRows})
            });
        })
        .catch(error => res.status(500).json({error}))

    }else{
        const query="UPDATE users SET email=?, lastName=?, firstName=?, description=? where id=?";
        const params=[req.body.email, req.body.lastName, req.body.firstName, req.body.description, req.params.id]
        db.query(query,params,(err,result,fields) => {
            if(err) {throw err};
            res.json({updated:result.affectedRows})
        });
    }
};

exports.deleteUser = (req, res) => {
    const query="DELETE FROM users where id=?";
    const params=[req.params.id]
    db.query(query,params,(err,result,fields) => {
        if(err) {throw err};
        res.json({deleted:result.affectedRows})
    });
};

exports.getOneUser = (req, res) => {
    db.query('SELECT * FROM users where id=?',[req.params.id], (err,rows) => {
        if(err) {throw err};
        res.json({data:rows})
    });
};

exports.getAllUsers = (req, res) => {
    db.query('SELECT firstName, lastName, id FROM users', (err,rows) => {
        if(err) {throw err};
        res.json({data:rows})
    });
};
