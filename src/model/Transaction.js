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
            enum: ['pending', 'cancelled', 'approved', 'completed'],
            default: 'pending',
        },
        transaction_method_of_request_recipient: {
            type: String,
            enum: ['null', 'free', 'intermediary'],
            default: 'null',
        },
        transaction_method_of_request_sender: {
            type: String,
            enum: ['null', 'free', 'intermediary'],
            default: 'null',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Transaction', TransactionSchema);
