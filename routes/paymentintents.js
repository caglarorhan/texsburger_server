const express = require('express');
const router = express.Router();
const paymentControllers = require('../controllers/payment');

router.post('/', paymentControllers.paymentIntent);

module.exports = router;
