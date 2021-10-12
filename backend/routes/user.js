const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/user');
const auth = require('../middleware/auth');

router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.put("/:id", userCtrl.modifyUser);
router.get("/:id", userCtrl.getOneUser);
router.get("/", userCtrl.getAllUsers);
router.delete("/:id", userCtrl.deleteUser);

module.exports = router;