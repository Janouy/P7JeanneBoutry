const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const commentCtrl = require('../controllers/comment');


router.get("/", commentCtrl.getAllComments);
router.post("/:id", auth, commentCtrl.addComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;