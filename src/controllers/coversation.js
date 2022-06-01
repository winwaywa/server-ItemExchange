const Conversation = require('../model/Conversation');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const createConversation = async (res, req) => {
    try {
        const conversation = await Conversation.create(req.body);
        res.status(StatusCodes.CREATED).json({ conversation });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = { createConversation };
