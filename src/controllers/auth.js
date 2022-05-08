const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');

const register = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new BadRequestError('Cung cấp đầy đủ username và password!');
        }
        //check username đã đki chưa
        const userExist = await User.findOne({ username });
        if (userExist) {
            throw new UnauthenticatedError('Username này đã tồn tại');
        }
        //tạo acc
        const user = await User.create({ ...req.body });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({
            user: { username: user.username, avatar: user.avatar },
            token,
        });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new BadRequestError('Cung cấp đầy đủ username và password!');
        }
        const user = await User.findOne({ username });
        if (!user) {
            throw new UnauthenticatedError('Tài khoản hoặc mật khẩu không đúng!');
        }
        // compare password
        const isPasswordCorrect = await user.comparePassword(password);
        if (!isPasswordCorrect) {
            throw new UnauthenticatedError('Tài khoản hoặc mật khẩu không đúng!');
        }
        const token = user.createJWT();
        res.status(StatusCodes.OK).json({
            user: { username: user.username, avatar: user.avatar },
            token,
        });
    } catch (err) {
        res.status(err.statusCode).json({ message: err.message });
    }
};

module.exports = { register, login };
