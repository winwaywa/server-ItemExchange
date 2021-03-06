const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema(
    {
        conversationId: {
            type: mongoose.Types.ObjectId,
            ref: 'Conversation',
            required: [true, 'Please provide conversation id'],
        },
        user: String,
        text: String,
        seen: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Message', MessageSchema);
