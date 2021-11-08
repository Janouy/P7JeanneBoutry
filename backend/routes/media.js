const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const mediaCtrl = require('../controllers/media');
const multer = require('../middleware/multer-config');


router.post("/:id",auth, multer, mediaCtrl.addMedia);


module.exports = router;