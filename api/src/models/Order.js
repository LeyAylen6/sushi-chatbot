const mongoose = require('mongoose');

const OrderSchema = new mongoose.Schema({
    client: {
        type: String,
        required: [true, 'Client name is required.'],
        trim: true
    },
    products: [
        {
            productId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true
            },
            quantity: {
                type: Number,
                required: true,
                min: [1, 'The quantity must be at least one']
            }
        }
    ],
    total: {
        type: Number,
        required: false
    },
    state: {
        type: String,
        enum: ['pending', 'in process', 'complete', 'cancel'],
        default: 'pending'
    },
    createAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Order', OrderSchema);