const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const textCtrl = require('../controllers/text');


router.get("/", textCtrl.getAllTexts);
router.get("/:id", textCtrl.getAllTextsOneUser);
router.post("/:id", auth, textCtrl.addText);
router.delete("/:id", auth, textCtrl.deleteText);

module.exports = router;