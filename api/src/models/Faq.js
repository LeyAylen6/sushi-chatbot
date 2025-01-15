const mongoose = require('mongoose');

const FAQSchema = new mongoose.Schema({
    question: {
        type: String,
        required: [true, 'The question is required.'],
        trim: true
    },
    answer: {
        type: String,
        required: [true, 'The answer is required.'],
        trim: true
    }
});

module.exports = mongoose.model('FAQ', FAQSchema);