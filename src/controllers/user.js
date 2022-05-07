const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

const getUser = async (req, res) => {
    try {
        const { userId, userName } = req.user;
        const user = await User.findById({ _id: userId });
        if (!user) {
            throw new NotFoundError(`Không tìm thấy người dùng có username ${userName}`);
        }
        res.status(StatusCodes.OK).json({ user });
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { userId, userName } = req.user;
        const user = await User.findByIdAndUpdate({ _id: userId, username: userName }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!user) {
            throw new NotFoundError(`Cập nhật không thành công với username ${userName}`);
        }
        res.status(StatusCodes.OK).json({ user });
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

module.exports = { getUser, updateUser };
