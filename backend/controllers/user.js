const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.signup = (req, res) => {
    db.query('SELECT * FROM users where email=?',[req.body.email], (err,rows) => {
        if(err) {
            return res.status(500).json({err: 'problème interne, veuillez réessayer plus tard'})
        }else{
            if(rows.length == 0) {
                bcrypt.hash(req.body.password, 10)
                .then(hash =>{
                    const query="INSERT INTO users SET ?";
                    const params={email:req.body.email, password:hash, firstName: req.body.firstName, lastName: req.body.lastName}
                    db.query(query,params,(err,result) => {
                        res.json({saved:result.affectedRows,inserted_id:result.insertId})
                    });
                })
                .catch(err => res.status(500).json({err: 'problème interne, veuillez réessayer plus tard'})); 
            }else{
                return res.status(401).json({err: 'utilisateur déjà existant'})
            };
        }
    });
};

exports.login = (req, res, next) => {
    db.query('SELECT*FROM users where email=?',[req.body.email], (err,rows) => {
        if(err) {
            return res.status(500).json({err: 'problème interne, veuillez réessayer plus tard'})
        }else{
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
                        { expiresIn: '24h'}
                        ),
                        admin: rows[0].admin,
                    });
                })
                .catch(error => res.status(500).json({err: 'problème interne, veuillez réessayer plus tard'}))
            }
            else{
                return res.status(401).json({error: 'utilisateur non trouvé'})
            };
        }
    })
}; 

exports.modifyUser = (req, res) => {
    try{
        if(req.body.password){
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                const query="UPDATE users SET email=?, lastName=?, firstName=?, description=?, password=? where id=?";
                const params=[req.body.email, req.body.lastName, req.body.firstName, req.body.description, hash, req.params.id];
                db.query(query,params,(err,result,fields) => {
                    if(err) {
                        throw err
                    };
                    res.json({updated:result.affectedRows})
                });
            })
            .catch(error => res.status(500).json({error}))
        }else{
            const query="UPDATE users SET email=?, lastName=?, firstName=?, description=? where id=?";
            const params=[req.body.email, req.body.lastName, req.body.firstName, req.body.description, req.params.id]
            db.query(query,params,(err,result,fields) => {
                if(err) {
                    throw err
                };
                res.json({updated:result.affectedRows})
            });
        }
    }catch (err) {
        res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
    }
};

exports.deleteUser = (req, res) => {
    const query="DELETE FROM users where id=?";
    const params=[req.params.id];
    try{
        db.query(query,params,(err,result,fields) => {
            if(err) {
                throw err
            };
            res.json({deleted:result.affectedRows})
        });
    }catch (err) {
        res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
    }
};

exports.getOneUser = (req, res) => {
    try{
        db.query('SELECT * FROM users where id=?',[req.params.id], (err,rows) => {
            if(err) {
                throw err
            };
            res.json({data:rows})
        });
    }catch (err) {
        res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
    }
};

exports.getAllUsers = (req, res) => {
    try{
        db.query('SELECT firstName, lastName, id FROM users', (err,rows) => {
            if(err) {
                throw err
            };
            res.json({data:rows})
        });
    }catch (err) {
        res.status(500).json({err: 'problème interne, veuillez réessayer plus tard' });
    }
};
