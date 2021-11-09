const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const pictureCtrl = require('../controllers/picture');
const multer = require('../middleware/multer-config');


router.post("/:id",auth, multer, pictureCtrl.addPicture);
router.delete("/:id",auth, pictureCtrl.deletePicture);

module.exports = router;