const express = require('express');
const { getFAQs, createFAQ, updateFAQ, deleteFAQ } = require('../controllers/faqController');

const router = express.Router();

router.get('/', getFAQs);
router.post('/', createFAQ);
router.put('/:id', updateFAQ);
router.delete('/:id', deleteFAQ);

module.exports = router;