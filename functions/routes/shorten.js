const express = require('express');
const router = express.Router();
const { shortenUrl } = require('../utils/shortenUtils');

router.post('/api/shorten', shortenUrl);

module.exports = router;