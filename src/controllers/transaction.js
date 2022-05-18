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
        const transaction = await Transaction.create(req.body);
        if (!transaction) {
            throw new NotFoundError(`Create transaction fail`);
        }
        res.status(StatusCodes.CREATED).json({ transaction });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const updateTransaction = async (req, res) => {
    try {
        const { id } = req.params;
        const transaction = await Transaction.updateMany(
            { _id: id, request_recipient: req.user.userName },
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        if (!transaction) {
            throw new NotFoundError(`No transaction with id ${id}`);
        }
        res.status(StatusCodes.CREATED).json({ transaction });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const deleteTransaction = async (req, res) => {
    try {
        console.log('alo', req.query);

        const transaction = await Transaction.deleteMany(req.query);
        if (!transaction) {
            throw new NotFoundError(`Delete fail !`);
        }
        res.status(StatusCodes.OK).json({ transaction });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    createTransaction,
    getTransactionsWithCondition,
    updateTransaction,
    deleteTransaction,
};
