// paymentRoutes.js
const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');

// Rotta per creare un pagamento
router.post('/create-payment-intent', paymentController.createPaymentIntent);

module.exports = router;
