const path = require('path');

const Product = require('../model/Product');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

//Lấy tất cả sp có trạng thái new và requesting
const getAllProducts = async (req, res) => {
    try {
        const products = await Product.find({ status: 'disable' });
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
        if (req.files) {
            const images_url = [];
            const images = req.files;
            for (let key in images) {
                const img = images[key];
                if (!img.mimetype.startsWith('image')) {
                    throw new BadRequestError('Please Upload Image');
                }
                //check size
                const maxSize = 1024 * 1024;
                if (img.size > maxSize) {
                    throw new BadRequestError('Please upload image smaller 1MB');
                }
                //tạo đường dẫn và lưu file vào
                const imagePath = path.join('public/uploads/products/' + `${img.name}`);
                await img.mv(imagePath);

                // set cho avatar cái link để lưu vào db
                const url = `http://${process.env.HOST_NAME}:${process.env.PORT}/uploads/products/${img.name}`;
                images_url.push(url);
            }
            req.body.images_url = images_url.join(',');
        }

        req.body.createdBy = req.user.userId;
        const product = await Product.create(req.body);
        res.status(StatusCodes.CREATED).json({ product });
    } catch (err) {
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
