const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });

  exports.addMedia = (req, res) => {
    let date = Date.now();
    let imageUrl = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`; 
    const query="INSERT INTO text SET ?";
    const params={media:imageUrl, user_id:req.params.id, date:date}
    db.query(query,params,(err,result) => {
      if(err) throw err;
      res.json({saved:result.affectedRows,inserted_id:result.insertId})
    }); 
  };

  exports.getAllMedias = (req, res) => {
    db.query('SELECT*FROM media JOIN users ON media.user_id = users.id', (err,rows) => {
        if(err) throw err;
        res.json({data:rows})
    });
  };