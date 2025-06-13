const express = require('express');
const router = express.Router();
const { cleanupExpiredUrls } = require('../utils/cleanupUtils');

router.get('/api/cleanup', cleanupExpiredUrls);

module.exports = router;