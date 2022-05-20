const path = require('path');

const Product = require('../model/Product');
const User = require('../model/User');
const { StatusCodes } = require('http-status-codes');
const { NotFoundError, BadRequestError } = require('../errors');

//Lấy tất cả sp có trạng thái new và requesting
const getAllProducts = async (req, res) => {
    console.log(req.query);

    //sort
    const { _sort } = req.query;
    const [field, condition] = _sort.split(':');
    //pagination
    const { _page, _limit } = req.query;
    const start = (_page - 1) * _limit;
    //price
    const price_gte = req.query.price_gte || 0;
    const price_lte = req.query.price_lte || 999999999999;
    // percent new
    const percent_new_gte = req.query.percent_new_gte || 0;
    const percent_new_lte = req.query.percent_new_lte || 100;
    //search
    const _search = req.query._search || '';

    //province
    const { province } = req.query;
    var userIdList = [];
    if (province) {
        const users = await User.find().where({ province });
        userIdList = users.map((user) => user._id);
    } else {
        const users = await User.find();
        userIdList = users.map((user) => user._id);
    }

    try {
        const products = await Product.find()
            .where({
                ...req.query,
                price: { $gte: price_gte, $lte: price_lte },
                percent_new: { $gte: percent_new_gte, $lte: percent_new_lte },
                product_name: { $regex: _search },
                createdBy: userIdList,
            })
            .sort({ [field]: condition })
            .skip(start)
            .limit(_limit);

        const total = await Product.find().where(req.query).countDocuments();
        const pagination = { page: Number.parseInt(_page), limit: Number.parseInt(_limit), total };

        res.status(StatusCodes.OK).json({ products, pagination });
    } catch (err) {
        console.log(err);
        res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
};

const getProductsByUser = async (req, res) => {
    try {
        const products = await Product.find({ ...req.query, createdBy: req.user.userId });
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
