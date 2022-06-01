const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Please provide name'],
        maxlength: 50,
        minlength: 3,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        default: '123456',
        minlength: 6,
    },
    avatar: {
        type: String,
        default: 'https://gravatar.com/avatar/b29b6512758a96c3343b4c3875f9ac1b?s=200&d=mp&r=x',
    },
    full_name: { type: String, default: '' },
    phone: { type: String, default: '' },
    email: {
        type: String,
        default: '',
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            'Please provide a valid email',
        ],
        // unique: true,
    },
    address: { type: String, default: '' },
    province: { type: String, default: '' },
    role: {
        type: String,
        enum: ['admin', 'member'],
        default: 'member',
    },
});

//mã hoá pass trước khi lưu
UserSchema.pre('save', async function () {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

//so sánh pass
UserSchema.methods.comparePassword = async function (canditatePassword) {
    const isMatch = await bcrypt.compare(canditatePassword, this.password);
    return isMatch;
};

//tạo JWT
UserSchema.methods.createJWT = function () {
    return jwt.sign({ userId: this._id, userName: this.username }, process.env.JWT_SECRET, {
        expiresIn: '7d',
    });
};

module.exports = mongoose.model('User', UserSchema);
