const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');

/**
 * @route GET /api/home/content
 * @desc Get all content for the home page
 * @access Public
 */
router.get('/content', homeController.getHomeContent);

module.exports = router; 