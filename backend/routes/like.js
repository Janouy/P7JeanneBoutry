const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const likeCtrl = require('../controllers/like');


router.get("/",likeCtrl.likesDisplay);

module.exports = router;