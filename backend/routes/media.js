const express = require('express');
const router = express.Router();
const mediaCtrl = require('../controllers/media');
const multer = require('../middleware/multer-config');


router.get("/", mediaCtrl.getAllMedias);
router.post("/:id",multer, mediaCtrl.addMedia);


module.exports = router;