const express = require('express');
const router = express.Router();

const productRoutes = require('./productRoutes')
const orderRoutes = require('./orderRoutes')
const faqRoutes = require('./faqRoutes')
const chatIARoutes = require('./chatIARoutes')

router.use('/product', productRoutes);
router.use('/order', orderRoutes);
router.use('/faq', faqRoutes);
router.use('/chat', chatIARoutes);

module.exports = router;