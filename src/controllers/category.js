const Category = require('../model/Category');
const { StatusCodes } = require('http-status-codes');

const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.status(StatusCodes.OK).json({ categories });
};
const getCategory = async (req, res) => {
    const { id } = req.params;
    const category = await Category.findOne({ _id: id });
    res.status(StatusCodes.OK).json({ category });
};
const createCategory = async (req, res) => {
    const category = await Category.create(req.body);
    res.status(StatusCodes.OK).json({ category });
};
const deleteCategory = async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    res.status(StatusCodes.OK).json({ category });
};

module.exports = { getAllCategories, getCategory, createCategory, deleteCategory };
