const Transaction = require('../model/Transaction');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

//Lấy tất cả transaction của sản phẩm được gửi yêu cầu
const getTransactionsWithCondition = async (req, res) => {
    try {
        const transactions = await Transaction.find(req.query);
        if (!transactions) {
            throw new NotFoundError(`No transactions found!`);
        }
        res.status(StatusCodes.OK).json({ transactions });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const createTransaction = async (req, res) => {
    try {
        req.body.request_sender = req.user.userName;
        console.log(req.body);
        const transaction = await Transaction.create(req.body);
        if (!transaction) {
            throw new NotFoundError(`Create transaction fail`);
        }
        res.status(StatusCodes.CREATED).json({ transaction });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    createTransaction,
    getTransactionsWithCondition,
};
