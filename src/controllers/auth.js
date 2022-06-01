const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { BadRequestError, UnauthenticatedError } = require('../errors');
const { OAuth2Client } = require('google-auth-library');

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

const loginWithGoogle = async (req, res) => {
    const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID, process.env.GOOGLE_SECRET);
    const ticket = await client.verifyIdToken({
        idToken: req.body.credential,
        audience: process.env.GOOGLE_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);

    const { email: username, email, name: full_name, picture: avatar } = payload;

    const userExist = await User.findOne({ username });
    if (!userExist) {
        //register
        const user = await User.create({ username, email, full_name, avatar });
        const token = user.createJWT();
        res.status(StatusCodes.CREATED).json({
            user: { username: user.username, avatar: user.avatar },
            token,
        });
    }

    //login
    const token = userExist.createJWT();
    res.status(StatusCodes.OK).json({
        user: { username: userExist.username, avatar: userExist.avatar },
        token,
    });
};

module.exports = { register, login, loginWithGoogle };
