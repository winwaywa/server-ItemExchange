const path = require('path');
const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

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
        //có file gửi lên thì lưu file vào sv và tạo link lưu vào db
        if (req.files) {
            const { file_avatar } = req.files;
            //file ko phải image thì báo lỗi
            if (!file_avatar.mimetype.startsWith('image')) {
                throw new BadRequestError('Please Upload Image');
            }
            //check size
            const maxSize = 1024 * 1024;
            if (file_avatar.size > maxSize) {
                throw new BadRequestError('Please upload image smaller 1MB');
            }
            //tạo đường dẫn và lưu file vào
            const imagePath = path.join('public/uploads/avatar/' + `${file_avatar.name}`);
            await file_avatar.mv(imagePath);

            // set cho avatar cái link để lưu vào db
            req.body.avatar = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/avatar/${file_avatar.name}`;
        }

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
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = { getUser, updateUser, getUserById };
