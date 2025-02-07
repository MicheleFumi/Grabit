const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// 🔹 Login (Passport + JWT)
router.post('/login', authController.login);

// 🔹 Registrazione
router.post('/register', authController.register);

// 🔹 Refresh del token
router.post('/refresh', authController.refreshToken);

// 🔹 Logout
router.post('/logout', authController.logout);

// 🔹 Accesso alla dashboard (protetto da JWT)
router.get('/dashboard', authController.isAuth, authController.dashboard);

module.exports = router;
