const express = require('express');
const router = express.Router();
const { redirectToOriginal } = require('../utils/redirectUtils');

router.get('/:key', redirectToOriginal);

module.exports = router;