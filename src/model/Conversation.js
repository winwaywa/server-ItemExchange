const mongoose = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        members: { type: [String] },
        isOpen: { type: Boolean, default: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
