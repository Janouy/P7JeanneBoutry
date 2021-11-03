const express = require('express');
const router = express.Router();
const mediaCtrl = require('../controllers/media');
const multer = require('../middleware/multer-config');


router.post("/",multer, mediaCtrl.addMedia);

module.exports = router;