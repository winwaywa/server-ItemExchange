const Product = require('../model/Product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError } = require('../errors');

//Lấy tất cả sp có trạng thái new và requesting
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: ['new', 'requesting'] });
        res.status(StatusCodes.OK).json({ products });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getProductsByUser = async (req, res) => {
    try {
        const products = await Product.find({ createdBy: req.user.userId });
        res.status(StatusCodes.OK).json({ products });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const product = await Product.findOne({ _id: id });
        if (!product) {
            throw new NotFoundError(`No product with id ${id}`);
        }
        res.status(StatusCodes.OK).json({ product });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};
const createProduct = async (req, res) => {
    try {
        req.body.createdBy = req.user.userId;
        const product = await Product.create(req.body);
        res.status(StatusCodes.CREATED).json({ product });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const updateProduct = async (req, res) => {
    try {
        const {
            user: { userId },
            params: { id },
        } = req;
        const product = await Product.findByIdAndUpdate({ _id: id, createdBy: userId }, req.body, {
            new: true,
            runValidators: true,
        });
        if (!product) {
            throw new NotFoundError(`No product with id ${id}`);
        }
        res.status(StatusCodes.OK).json({ product });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};
const deleteProduct = async (req, res) => {
    try {
        const {
            user: { userId },
            params: { id },
        } = req;
        const product = await Product.findByIdAndRemove({ _id: id, createdBy: userId });
        if (!product) {
            throw new NotFoundError(`No product with id ${id}`);
        }
        res.status(StatusCodes.OK).json({ product });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

module.exports = {
    getAllProducts,
    getProductsByUser,
    getProduct,
    createProduct,
    updateProduct,
    deleteProduct,
};
