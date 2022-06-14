const Delivery = require('../model/Delivery');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

const getAllDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.find(req.query).sort({ updatedAt: 'DESC' });
        if (!delivery) {
            throw new NotFoundError(`No delivery found!`);
        }
        res.status(StatusCodes.OK).json({ delivery });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const createDelivery = async (req, res) => {
    try {
        const delivery = await Delivery.create(req.body);
        if (!delivery) {
            throw new NotFoundError(`Create delivery fail`);
        }
        res.status(StatusCodes.CREATED).json({ delivery });
    } catch (err) {
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    getAllDelivery,
    createDelivery,
};
