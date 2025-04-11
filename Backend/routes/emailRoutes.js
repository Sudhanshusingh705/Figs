const express = require('express');
const router = express.Router();
const emailController = require('../controllers/emailController');

// Public email routes
router.post('/contact', emailController.sendContactEmail);
router.post('/subscribe', emailController.subscribeNewsletter);

module.exports = router; 