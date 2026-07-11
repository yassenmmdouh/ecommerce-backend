const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    items: [{
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
            required: true
        },
        quantity: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalPrice: {
        type: Number,
        required: true,
        default: 0
    },
    status: {
        type: String,
        enum: ['Pending', 'Processing', 'Delivered'],
        default: 'Pending'
    }
}, { timestamps: true });
module.exports = mongoose.model("Order", orderSchema);