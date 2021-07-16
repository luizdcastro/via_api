const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");

router.post("/registrar", authController.signup);
router.post("/login", authController.login);
router.patch('/updatePassword', authController.protect, authController.updatePassword);

module.exports = router;