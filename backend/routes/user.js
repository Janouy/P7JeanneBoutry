const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const check = require('../middleware/checkCaracteres');
const length = require('../middleware/passwordLength');
const fsImages = require('../middleware/createImages');

router.post("/signup", fsImages, userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", auth, userCtrl.modifyUser);
router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;