const mysql = require('mysql');
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "rootp7",
    database: "database_development"
  });


  exports.addVideo = (req, res) => {
    let videoUrl = `${req.protocol}://${req.get('host')}/videos/${req.file.filename}`; 
    const query="INSERT INTO post SET ?";
    const params={video:videoUrl, user_id:req.params.id}
    db.query(query,params,(err,result) => {
      if(err) throw err;
      res.json({saved:result.affectedRows,inserted_id:result.insertId})
    }); 
  };