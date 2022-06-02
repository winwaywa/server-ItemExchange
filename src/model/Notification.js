const mongoose = require('mongoose');
const NotificationSchema = new mongoose.Schema(
    {
        user: { type: String, require: [true, 'Please provide username'] },
        text: String,
        seen: { type: Boolean, default: false },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Notification', NotificationSchema);
