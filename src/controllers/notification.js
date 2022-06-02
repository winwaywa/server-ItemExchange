const Notification = require('../model/Notification');
const { StatusCodes } = require('http-status-codes');

const getNotificationsByUser = async (req, res) => {
    try {
        const notifications = await Notification.find({
            user: req.user.userName,
            ...req.query,
        }).sort({ createdAt: 'DESC' });
        res.status(StatusCodes.OK).json({ notifications });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const createNotification = async (req, res) => {
    try {
        const notification = await Notification.create(req.body);
        if (!notification) {
            throw new NotFoundError(`Create Notification fail`);
        }
        res.status(StatusCodes.CREATED).json({ notification });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const updateNotification = async (req, res) => {
    try {
        const notification = await Notification.findByIdAndUpdate({ _id: req.params.id }, req.body);
        if (!notification) {
            throw new NotFoundError(`Update Notification fail`);
        }

        res.status(StatusCodes.OK).json({ notification });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = { getNotificationsByUser, createNotification, updateNotification };
