const express = require('express');
const router = express.Router();
const likeCtrl = require('../controllers/like');


router.get("/",likeCtrl.likesDisplay);

module.exports = router;