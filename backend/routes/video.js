const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const videoCtrl = require('../controllers/video');
const multerVideo = require('../middleware/multer-video');


router.post("/:id",auth, multerVideo, videoCtrl.addVideo);


module.exports = router;