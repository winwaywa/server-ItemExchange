const Conversation = require('../model/Conversation');
const { StatusCodes } = require('http-status-codes');

const openConversation = async (req, res) => {
    try {
        const { members } = req.body;
        const isExist = await Conversation.findOne({
            members: { $all: members },
        });
        if (!isExist) {
            const conversation = await Conversation.create(req.body);
            res.status(StatusCodes.CREATED).json({ conversation });
        }
        await Conversation.findOneAndUpdate({ members: { $all: members } }, { isOpen: true });
        res.status(StatusCodes.OK).json({ message: 'Open connversation successfully' });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};
const closeConversations = async (req, res) => {
    const { members } = req.body;
    try {
        const conversation = await await Conversation.findOneAndUpdate(
            { members: { $all: members } },
            { isOpen: false }
        );
        res.status(StatusCodes.OK).json({ conversation });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getConversationsByUser = async (req, res) => {
    try {
        const { userName } = req.user;
        const conversations = await Conversation.find({ members: { $in: userName }, isOpen: true });
        console.log(conversations);
        res.status(StatusCodes.OK).json({ conversations });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = { openConversation, getConversationsByUser, closeConversations };
