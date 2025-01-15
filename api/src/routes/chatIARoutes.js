const express = require('express');
const { chat } = require('../controllers/chatIAController');

const router = express.Router();

router.post('/', chat);

module.exports = router;