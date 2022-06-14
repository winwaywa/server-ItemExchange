const mongoose = require('mongoose');

const DeliverySchema = new mongoose.Schema(
    {
        shipper: { type: String, default: '' },
        transaction_id: {
            type: mongoose.Types.ObjectId,
            ref: 'Transaction',
            required: [true, 'Please provide transaction id'],
        },
        status_id: {
            type: String,
            enum: ['pending', 'approved', 'delivering', 'completed', 'cancelled'],
            default: 'pending',
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Delivery', DeliverySchema);
