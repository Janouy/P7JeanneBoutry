const express = require('express');
const User = require('./models/user');

const app = express();

// permet d'extraire un objet JSON d'une requete POST//
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const mysql = require('mysql');
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "rootp7",
  database: "database_development"
});

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

// ajout contact//
app.post("/save-contact", (request, response) => {
  const req=request.query
  const query="INSERT INTO users SET ?";
  var CURRENT_TIMESTAMP = mysql.raw('now()');
  const params={email:'test7@test.fr', password:'motdepasse3', username:'Moi', isAdmin:0, createdAt:CURRENT_TIMESTAMP, updatedAt:CURRENT_TIMESTAMP}
  db.query(query,params,(err,result,fields) => {
    if(err) throw err;
    response.json({saved:result.affectedRows,inserted_id:result.insertId})
  });
})

//affichage 1 contact//
  app.get("/get-contact-info", (request, response) => {
    const req=request.query
    db.query('SELECT * FROM users where id=?',[4], (err,rows) => {
      if(err) throw err;
      response.json({data:rows})
    });
  })

  //affichage tous les contacts//
  app.get("/get-all-contact", (request, response) => {
    db.query('SELECT * FROM users', (err,rows) => {
      if(err) throw err;
      response.json({data:rows})
    });
  })

  //mise à jout1 contact//
  app.get("/update-contact", (request, response) => {
    const req=request.query
    const query="UPDATE users SET email=? where id=?";
    const params=['test3@test.fr','2']
    db.query(query,params,(err,result,fields) => {
      if(err) throw err;
      response.json({updated:result.affectedRows})
    });
  })

  //suppression contact//
  app.get("/delete-contact", (request, response) => {
    const req=request.query
    const query="DELETE FROM users where id=?";
    const params=['1']
    db.query(query,params,(err,result,fields) => {
      if(err) throw err;
      response.json({deleted:result.affectedRows})
    });
  })
module.exports = app;