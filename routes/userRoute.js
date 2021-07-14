const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

router.get(
    '/me',
    authController.protect,
    userController.getMe,
    userController.getUser
);

router
    .route('/')
    .get(userController.getAllusers)

router
    .route('/:id')
    .get(userController.getUser)

router.patch('/update/:id', authController.protect, userController.updateMe);

module.exports = router;