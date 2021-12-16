const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');
const fsImages = require('../middleware/createImages');

router.post("/signup", fsImages, userCtrl.signup);
router.post("/login", fsImages, userCtrl.login);
router.put("/:id", auth, userCtrl.modifyUser);
router.get("/:id", auth, userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:id", auth, userCtrl.deleteUser);

module.exports = router;