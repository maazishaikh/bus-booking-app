const express = require('express');
const router = express.Router();
const AuthController = require('../controllers/AuthController');

router.get('/login', AuthController.loginPage);
router.post('/login', AuthController.loginUser);
router.get('/register', AuthController.registerPage);
router.post('/register', AuthController.registerUser);
router.get('/logout', AuthController.logoutUser);

module.exports = router;
