const mysql = require('mysql');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash =>{
        const query="INSERT INTO users SET ?";
        const params={email:req.body.email, password:hash}
        db.query(query,params,(err,result,fields) => {
            if(err) throw err;
            res.json({saved:result.affectedRows,inserted_id:result.insertId})
    });
    })
    .catch(error => res.status(500).json({error}));
};

exports.login = (req, res, next) => {
    db.query('SELECT * FROM users where email=?',[req.body.email], (err,rows) => {
        if(err) throw err;
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

exports.modifyUser = (req, response) => {
    const query="UPDATE users SET email=? where id=?";
    const params=[req.body.email, req.body.id]
    db.query(query,params,(err,result,fields) => {
        if(err) throw err;
        response.json({updated:result.affectedRows})
    });
};

exports.deleteUser = (req, res) => {
    const query="DELETE FROM users where id=?";
    const params=[req.body.id]
    db.query(query,params,(err,result,fields) => {
        if(err) throw err;
        res.json({deleted:result.affectedRows})
    });
};

exports.getOneUser = (request, response) => {
    const req=request.query
    db.query('SELECT * FROM users where id=?',[4], (err,rows) => {
        if(err) throw err;
        response.json({data:rows})
    });
};

exports.getAllUsers = (request, response) => {
    db.query('SELECT * FROM users', (err,rows) => {
        if(err) throw err;
        response.json({data:rows})
    });
}