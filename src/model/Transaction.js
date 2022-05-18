const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema(
    {
        request_sender: String,
        request_recipient: String,
        product_id_requested: {
            type: mongoose.Types.ObjectId,
            ref: 'Product',
            required: [true, 'Please provide product id'],
        },
        exchange_value: String,
        status: {
            type: String,
            enum: ['pending', 'cancelled', 'approved'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
