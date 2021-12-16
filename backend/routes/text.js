const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const textCtrl = require('../controllers/text');


router.get("/", auth, textCtrl.getAllTexts);
router.get("/:id", auth, textCtrl.getAllTextsOneUser);
router.post("/", auth, textCtrl.addText);
router.post('/:id' ,auth, textCtrl.likeText);
router.delete("/:id", auth, textCtrl.deleteText);


module.exports = router;