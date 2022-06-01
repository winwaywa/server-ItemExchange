const mongoose = require('mongoose');
const { ref } = require('mongoose');

const ConversationSchema = new mongoose.Schema(
    {
        creator: String,
        member: String,
    },
    { timestamps: true }
);

module.exports = mongoose.model('Conversation', ConversationSchema);
