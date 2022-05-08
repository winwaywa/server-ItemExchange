const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

//Get thông tin người đã đăng nhập thành công
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

//Get thông tin người dùng theo id của họ
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        const user = await User.findById({ _id: id });
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

module.exports = { getUser, updateUser, getUserById };
