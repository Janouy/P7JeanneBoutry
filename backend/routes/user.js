const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const checkData = require('../middleware/checkData');
const passwordLength = require('../middleware/passwordLength');
const fsImages = require('../middleware/createImages');
const multer = require('../middleware/multer-config');

router.post("/signup", fsImages, checkData, passwordLength, userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, userCtrl.modifyUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;