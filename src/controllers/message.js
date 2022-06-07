const Message = require('../model/Message');
const { StatusCodes } = require('http-status-codes');

const createMessage = async (req, res) => {
    try {
        const message = await Message.create(req.body);
        res.status(StatusCodes.OK).json({ message });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};
const getMessagesByConversation = async (req, res) => {
    try {
        const { id } = req.params;
        const messages = await Message.find({ conversationId: id });
        res.status(StatusCodes.OK).json({ messages });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = { createMessage, getMessagesByConversation };
